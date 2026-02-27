import axios from "axios";

const VoteControll = ({ votes, setVotes, voted_id }) => {
  const handleVote = () => {
    setVotes((vote) => vote + 1);
    axios.patch(`/api/articles/${voted_id}`, { inc_votes: 1 }).then((data) => {
      console.log(data);
    });
  };
  return <button onClick={handleVote}>👍</button>;
};
export default VoteControll;
