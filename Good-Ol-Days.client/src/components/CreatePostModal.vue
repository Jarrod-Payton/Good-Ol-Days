<template>
  <!--Modal for creating a post-->
  <div class="modal fade" id="createPostModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <p class="modal-title">Post Photo</p>
          <button
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <!--Firebase Form to be able to upload photos-->
        <form @submit.prevent="upload">
          <div class="modal-body">
            <div class="row">
              <div class="col-12">
                <p class="S1">
                  Upload your file:
                  <input
                    class="inputupload mtop"
                    type="file"
                    accept="image/*,video/*"
                    id="inputfile"
                    @change="fileSelect"
                  />
                </p>
              </div>
              <!--The rest is straight forward input fields-->
              <div class="col-12">
                <p class="S1">
                  Post Title:
                  <input
                    type="text"
                    class="form-control border-0 mtop"
                    placeholder="Title your post ..."
                    v-model="postDetails.title"
                    required
                  />
                </p>
              </div>
              <div class="col-12">
                <p class="S1">
                  Post Description:
                  <input
                    type="text"
                    class="form-control border-0 mtop"
                    v-model="postDetails.description"
                    required
                  />
                </p>
              </div>
              <!--This is for if the user would like the challenge they have active to be attached to the photo-->
              <div class="col-12" v-if="activeChallenge.id">
                <p>
                  Is this post for the challenge?
                  <input
                    type="checkbox"
                    class="ms-3"
                    v-model="hasChallenge"
                    value="true"
                  />
                  Yes
                </p>
              </div>
              <!--This image tag is for spacing between the bottom of the modal and the bottom of the input area-->
              <img src="" alt="" class="img-fluid" id="image" />
              <video class="img-fluid visually-hidden" src="" id="video" />
            </div>
          </div>
          <div class="modal-footer">
            <button type="submit" class="btn" :disabled="submitting">
              <h5 v-if="!submitting">Submit</h5>
              <i class="mdi mdi-spin mdi-loading" v-if="submitting" />
            </button>
            <button data-bs-dismiss="modal" class="btn">Close</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { computed, ref } from "@vue/reactivity"
import { AppState } from "../AppState"
import Pop from "../utils/Pop"
import { postService } from "../services/PostService"
import { Modal } from "bootstrap"
import { logger } from '../utils/Logger'
import { firebaseService } from '../services/FirebaseService'
export default {
  setup() {
    const postDetails = ref({})
    const hasChallenge = ref(Boolean)
    const files = ref([])
    const submitting = ref(false)
    return {
      hasChallenge,
      submitting,
      postDetails,
      files,
      activeAlbum: computed(() => AppState.activeAlbum),
      activeChallenge: computed(() => AppState.activeChallenge),

      //When files are selected there is a process we need to go through to 
      //generate a usable form on our page. We do this process to have an image preview
      fileSelect(e) {
        try {

          //Grab the file object our of the event and put it into the reference object
          files.value = e.target.files
          logger.log('files ref value', files.value)

          //FileReader is a default js feature, it is super touch but will produce a renderable B64 version of whaterver
          //image file you have selected
          const reader = new FileReader()
          reader.readAsDataURL(files.value[0])
          reader.onload = () => {

            //Take the image you've now turned into something usable and set it into the src of the blank image elem we have
            document.getElementById('image').src = reader.result
            document.getElementById('video').src = reader.result
          }
        } catch (error) {
          Pop.toast(error)
          submitting.value = false
        }
      },

      //This is the post where we use the postDetails reference object to actually make and store our mongoDB objects
      async createPost() {
        try {

          //Make the call to the service layer to hit our API and save our post
          await postService.createPost(postDetails.value, hasChallenge.value)

          //Now we reset all of our refs to their default state
          document.getElementById('image').src = ''
          document.getElementById('video').src = ''
          postDetails.value = {}
          files.value = []
          Modal.getOrCreateInstance(document.getElementById("createPostModal")).toggle()
          submitting.value = false
          document.getElementById('inputfile').value = ""
        } catch (error) {
          Pop.toast(error)
          submitting.value = false
        }
      },

      //We hit this function before the create one above. Here we upload the selected image into firebase
      async upload() {
        try {
          //This ref is used to change the UI and prevent multiple submissions
          submitting.value = true
          logger.log('Submitting', submitting.value)

          //This line is going to both upload the image into firebase and return the new hosted URL for our img
          const url = await firebaseService.upload(files.value[0], this.activeAlbum, 'post')

          //Now just set the reference objects image url to our new firebase hosted one
          postDetails.value.type = files.value[0].type
          postDetails.value.imgUrl = url
          logger.log(url)

          //now we kick over to our created function to make the mongoDB calls
          await this.createPost()
        } catch (error) {
          logger.error(error)
        }
      }
    }
  },
}
</script>
<style scoped>
.inputupload {
  width: 100%;
  background-color: rgb(245, 245, 245);
  border: 0 !important;
  padding-top: 3px;
  padding-bottom: 3px;
  padding-left: 3px;
}
.mtop {
  margin-top: 5px;
}
.btn:focus {
  outline: none;
  box-shadow: none;
}
</style>