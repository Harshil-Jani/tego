import React, { useState } from "react";
import axios from "axios";

function Whisper() {
  const [file, setFile] = useState(null);
  const [transcription, setTranscription] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await fetch("http://localhost:8765/api", {
            method: "POST",
            body: formData,
          });

      setTranscription(response.data.transcription);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Transcribe</button>
      </form>

      {transcription && <p>{transcription}</p>}
    </div>
  );
}

export default Whisper;
