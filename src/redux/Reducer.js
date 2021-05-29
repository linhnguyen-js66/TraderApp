const initStore = {
    Score: 0
}
export default function reducer(state = initStore, action) {
    switch (action.type) {
        case "GET_SCORE": {
            let resultData = { ...state }
            resultData.Score = action.payload
            return resultData
        }
        case "SAVE_SCORE": {
            const Score = state.Score + action.payload
            return{
                ...state,
                Score
            }
        }
        default:
            return initStore
    }
}