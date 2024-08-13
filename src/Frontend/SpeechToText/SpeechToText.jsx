import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import useClipboard from 'react-use-clipboard';
import axios from 'axios';
import { toast } from 'react-toastify';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Colors
const colors = {
  primary: '#2D3250',    // 1st rank - majority color
  secondary: '#424769',  // 2nd rank - secondary color
  tertiary: '#7077A1',   // 3rd rank - accent color
  quaternary: '#F6B17A'  // 4th rank - minor space color
};

const SpeechToText = () => {
    const [textToCopy, setTextToCopy] = useState('');
    const [providedText, setProvidedText] = useState('');
    const [isCopied, setCopied] = useClipboard(textToCopy, { successDuration: 1000 });
    const [isBlurred, setIsBlurred] = useState(false);
    const [comparisonReport, setComparisonReport] = useState('');

    const { transcript, browserSupportsSpeechRecognition, resetTranscript } = useSpeechRecognition();

    const startListening = () => {
        SpeechRecognition.startListening({ continuous: true, language: 'en-US' });
        setIsBlurred(true);
    };

    const stopListening = () => {
        SpeechRecognition.stopListening();
        setIsBlurred(false);
    };

    const clearTranscript = () => {
        resetTranscript();
    };

    const compareTranscript = async () => {
        toast.info('Comparing transcript...');
    
        try {
          const response = await axios.post('http://127.0.0.1:8000/recitation', {
            provided_text: providedText,
            transcript: transcript
          });
          setComparisonReport(response.data.comparison_report);
          toast.success('Comparison successful!');
        } catch (error) {
          console.error('There was an error comparing the transcript!', error);
          toast.error(`Error comparing transcript: ${error.message}`);
        }
    };

    if (!browserSupportsSpeechRecognition) {
        return <p>Your browser does not support speech recognition.</p>;
    }

    return (
        <>
            <div className="speech-container" style={{ padding: '20px', maxWidth: '900px', margin: 'auto' }}>
                <h2 style={{ color: colors.primary, textAlign: 'center' }}>Speech to Text Converter</h2>
                <p style={{ textAlign: 'center' }}>A React hook that converts speech from the microphone to text and makes it available to your React components.</p>

                <textarea
                    value={providedText}
                    onChange={(e) => setProvidedText(e.target.value)}
                    placeholder="Paste the text content here..."
                    style={{ 
                        width: '100%', 
                        height: '100px', 
                        opacity: isBlurred ? 0.1 : 1, 
                        transition: 'opacity 0.3s ease',
                        marginBottom: '20px',
                        padding: '10px',
                        border: `1px solid ${colors.secondary}`,
                        borderRadius: '5px'
                    }}
                />

                <div className="speech-main-content" onClick={() => setTextToCopy(transcript)} style={{ padding: '10px', borderRadius: '5px', background: colors.secondary, cursor: 'pointer' }}>
                    <p style={{color:"white", fontSize:"20px"}}>{transcript}</p>
                </div>

                <div className="speech-btn-style" style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                    <button onClick={setCopied} style={buttonStyle}>
                        {isCopied ? 'Copied!' : 'Copy to clipboard'}
                    </button>
                    <button onClick={startListening} style={buttonStyle}>Start Listening</button>
                    <button onClick={stopListening} style={buttonStyle}>Stop Listening</button>
                    <button onClick={clearTranscript} style={buttonStyle}>Clear Transcript</button>
                    <button onClick={compareTranscript} style={buttonStyle}>Compare Recitation</button>
                </div>

                <div style={{ marginTop: '30px' }}>
                    <h3 style={{ color: colors.primary }}>Comparison Report:</h3>
                    <ReactMarkdown
                        children={comparisonReport}
                        remarkPlugins={[remarkGfm]}
                        components={{
                            h2: ({ node, ...props }) => (
                                <h2
                                    style={{
                                        color: colors.quaternary,
                                        fontSize: "24px",
                                        marginBottom: "10px",
                                    }}
                                    {...props}
                                />
                            ),
                            ul: ({ node, ...props }) => (
                                <ul
                                    style={{
                                        listStyleType: "disc",
                                        marginBottom: "20px",
                                        paddingLeft: "20px",
                                        color: colors.primary
                                    }}
                                    {...props}
                                />
                            ),
                            li: ({ node, ...props }) => (
                                <li style={{ marginBottom: "10px", color: "#333", fontSize: "18px" }} {...props} />
                            ),
                            strong: ({ node, ...props }) => (
                                <strong style={{ fontWeight: "bold", color: colors.tertiary }} {...props} />
                            ),
                            p: ({ node, ...props }) => (
                                <p style={{ marginBottom: "20px", fontSize: "18px", fontWeight: "400", color: "#666" }} {...props} />
                            )
                        }}
                    />
                </div>
            </div>
        </>
    );
}

// Button style for consistency
const buttonStyle = {
    backgroundColor: colors.quaternary,
    color: colors.primary,
    border: `1px solid ${colors.quaternary}`,
    padding: '10px 20px',
    borderRadius: '5px',
    fontWeight: 'bolder',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    outline: 'none'
};

export default SpeechToText;
