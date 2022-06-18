import React, { useState, useEffect, useContext } from 'react';
import { Modal } from 'react-modal';
import { Line } from 'rc-progress';
import { PollContext } from './PollCOntext';

const Poll = () => {
    const {question, setQuestion, answers: voteData, setAnswers, isModalOpen, setIsModalOpen} = useContext(PollContext);
    const [totalVotes, setTotalVotes] = useState(0);
    const [voted, setVoted] = useState(false);

    const closeModal = () => {
        setIsModalOpen(false);
        setTotalVotes(0);
        setVoted(false);
        setQuestion('');
        setAnswers([
            { option: '', votes: 0,  },
        { option: '', votes: 0,  },
        { option: '', votes: 0,  },
        { option: '', votes: 0,  },
        ])
    }

    return(
        <Modal
            isOpen={isModalOpen}
            onRequestClosed={closeModal}>

        </Modal>
    )
}

export default Poll;
