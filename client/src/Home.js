import * as React from 'react';
import withRoot from './withRoot';
import "./styles/index.css";
import CircularProgress from '@mui/material/CircularProgress';

function Index() {

  const fetchData = async (input: string) => {
    const response = await fetch("/api/v1/question", {
      method: "POST",
      body: JSON.stringify({query: input}),
      headers: { "Content-Type": "application/json", "ngrok-skip-browser-warning": "69420" },
    });
    const data = await response.json()

    console.log(data);
    return data.data;
  };

  const [input, setInput] = React.useState("");
  const [completedSentence, setCompletedSentence] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  async function handleClick() {
    setLoading(true);
    try {
      const completedSentence = await fetchData(input);
      setLoading(false);
      setCompletedSentence(completedSentence);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="chatbot-container">
      <h2>Ask Vapor Bot anything...</h2>
      <textarea
        style={{width: "100%", maxWidth: "100%"}}
        value={input}
        onChange={(event) => setInput(event.target.value)}
        rows={15}
        placeholder="What do you call someone who drinks beers while vapor honing? ... A vaporholic!"
      />
      <button className="button" onClick={handleClick} disabled={loading}>Submit</button>
      {completedSentence && <p>Answer: {completedSentence}</p>}
      {loading && <CircularProgress />}
    </div>
  );
}

export default withRoot(Index);
