const State = {
    currentUserID: <string | undefined>undefined,
    games: {
        audiocall: {
            learnedwords: 0,
            rightAnswers: 0,
            wrongAnswers: 0,
            winsSession: 0,
        },
        sprint: {
            learnedwords: 0,
            rightAnswers: 0,
            wrongAnswers: 0,
            winsSession: 0,
        },
    },
};

export default State;
