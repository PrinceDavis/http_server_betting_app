import {MessageQueuePort} from "../message_queue";
import {BGJobType} from "./job_types";
import GameService from "../../core/game/service";
import Game from "../../core/game";
import {DateTimeHelpers} from "../helpers/commons/date_time";

export type BGJobCallerParams = {
    messageQueue: MessageQueuePort,
    gameService: GameService
};


export default class BGJobCaller {
    private messageQueue: MessageQueuePort;
    private gameService: GameService;

    constructor(params: BGJobCallerParams) {
        this.messageQueue = params.messageQueue;
        this.gameService = params.gameService;
    }

    async endGameState(gameId: string) {
        const gameObj: Game = await this.gameService.fetchSingleGame(gameId)
        const offsetTo90secs = (90 * 60) - DateTimeHelpers.computeSecondsBetweenStartEndTime(gameObj.startedAt as Date)
        const jobName = "End Game state after 90 secs"
        const jobId = jobName + gameId
        this.messageQueue.addJobToQueue(
            this.messageQueue.getQueue(BGJobType.END_GAME_STATE),
            jobName,
            {gameId},
            (offsetTo90secs > 0) ? offsetTo90secs : 0,
            jobId
        )
    }


    async updateLiveGame(gameId: string) {
        const jobName = "Update live game after 5 secs : "
        const jobId = jobName + gameId
        this.messageQueue.addJobToQueue(
            this.messageQueue.getQueue(BGJobType.UPDATE_LIVE_GAME),
            jobName,
            {gameId},
            5,
            jobId
        )
    }

    async updateUserAccountBalance(userId: string, transactionId: string) {
        const jobName = "Update user account balance: "
        const jobId = jobName + userId + transactionId
        this.messageQueue.addJobToQueue(
            this.messageQueue.getQueue(BGJobType.UPDATE_USER_ACCOUNT_BALANCE),
            jobName,
            {userId},
            0,
            jobId
        )
    }
}