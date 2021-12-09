import moment from 'moment'
import { logger } from '../utils/Logger'


class MomentService {
    timeAgo(time) {
        const timeAgo = moment(time).fromNow()
        return timeAgo
    }

    date(time) {
        const date = moment(time).format("MMM Do YY")
        return date
    }
}

export const momentService = new MomentService()