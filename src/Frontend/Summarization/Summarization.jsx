// import React, { useState, useEffect } from 'react';
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
// import { Col, Row, Button } from "antd";

// const api_server = "http://127.0.0.1:8000";

// const ExportButton = ({ data, selected }) => {
//   const handleExport = async () => {
//     try {
//         const response = await fetch(`${api_server}/export`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ data, selected }),
//         });

//         if (!response.ok) {
//             throw new Error("Failed to export");
//         }

//         const blob = await response.blob();
//         const url = window.URL.createObjectURL(blob);
//         const a = document.createElement("a");
//         a.href = url;
//         a.download = selected === 0 ? "Summary.docx" : selected === 1 ? "Flashcards.docx" : "Quiz.docx";
//         document.body.appendChild(a);
//         a.click();
//         window.URL.revokeObjectURL(url);
//     } catch (error) {
//         console.error('There was an error exporting the summary!', error);
//     }
// };

//     return (
//         <Button
//             onClick={handleExport}
//             className="button-default"
//             style={{ marginTop: "20px", marginBottom: "20px" }}
//         >
//             Export {selected === 0 ? "Summary" : selected === 1 ? "Flashcards" : "Quiz"}
//         </Button>
//     );
// };

// const Summarization = ({ response }) => {
//   const [summary, setSummary] = useState("Summary");

//   useEffect(() => {
//     if (response != null) {
//       setSummary(response.summary);
//       console.log(summary);
//     }
//   }, []);

//   const newData = summary.replace("** ", "** /n");

//   return (
//     <Row justify="center" align="middle">
//       <Col
//         span={18}
//         style={{
//           textAlign: "left",
//           fontSize: "18px",
//           fontWeight: "500",
//           lineHeight: "1.6",
//           marginBottom: "30px",
//           paddingLeft: "50px",
//           padding: "40px 120px 40px 120px",
//           borderRadius: "20px",
//           boxShadow: "2px 4px 4px rgba(0, 0, 0, 0.4)",
//           backgroundColor: "rgba(255, 255, 255, 0.7)",
//           position: "relative",
//         }}
//       >
//         <ExportButton data={summary} selected={0} />
//         <h1>Summary:</h1>
//         <style>{`
//           ul {
//             list-style-type: disc;
//             margin-bottom: 20px;
//             padding-left: 20px;
//           }

//           ol {
//             list-style-type: disc;
//             margin-bottom: 20px;
//             padding-left: 20px;
//           }

//           li {
//             margin-bottom: 6px;
//           }

//           strong {
//             font-weight: bold;
//             font-size: 26px;
//             color: var(--main-dark);
//             margin-bottom: 20px;
//           }

//           p {
//             margin-bottom: 20px;
//             font-size: 18px;
//             font-weight: 600;
//           }
//         `}</style>
//         <ReactMarkdown
//           children={newData}
//           remarkPlugins={[remarkGfm]}
//           components={{
//             h2: ({ node, ...props }) => (
//               <h2
//                 style={{
//                   color: "var(--main-blue)",
//                   fontSize: "24px",
//                   marginBottom: "10px",
//                 }}
//                 {...props}
//               />
//             ),
//             ul: ({ node, ...props }) => (
//               <ul
//                 style={{
//                   listStyleType: "disc",
//                   marginBottom: "20px",
//                   paddingLeft: "20px",
//                 }}
//                 {...props}
//               />
//             ),
//             li: ({ node, ...props }) => (
//               <li style={{ marginBottom: "10px" }} {...props} />
//             ),
//             strong: ({ node, ...props }) => (
//               <strong style={{ fontWeight: "bold" }} {...props} />
//             ),
//           }}
//         />
//       </Col>
//     </Row>
//   );
// };

// export default Summarization;
import React, { useState, useEffect } from 'react';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Col, Row, Button } from "antd";

const api_server = "http://127.0.0.1:8000";

// Colors
const colors = {
  primary: '#2D3250',    // 1st rank - majority color
  secondary: '#424769',  // 2nd rank - secondary color
  tertiary: '#7077A1',   // 3rd rank - accent color
  quaternary: '#F6B17A'  // 4th rank - minor space color
};

const ExportButton = ({ data, selected }) => {
  const handleExport = async () => {
    try {
      const response = await fetch(`${api_server}/export`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data, selected }),
      });

      if (!response.ok) {
        throw new Error("Failed to export");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = selected === 0 ? "Summary.docx" : selected === 1 ? "Flashcards.docx" : "Quiz.docx";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('There was an error exporting the summary!', error);
    }
  };

  return (
    <Button
      onClick={handleExport}
      className="button-default"
      style={{
        marginTop: "20px",
        marginBottom: "20px",
        fontWeight: "bolder",
        backgroundColor: colors.quaternary,
        color: colors.primary,
        border: `1px solid ${colors.quaternary}`,
      }}
    >
      Export {selected === 0 ? "Summary" : selected === 1 ? "Flashcards" : "Quiz"}
    </Button>
  );
};

const Summarization = ({ response }) => {
  const [summary, setSummary] = useState("Summary");

  useEffect(() => {
    if (response != null) {
      setSummary(response.summary);
    }
  }, [response]);

  const newData = summary.replace("** ", "** /n");

  return (
    <Row justify="center" align="middle">
      <Col
        span={18}
        style={{
          textAlign: "left",
          fontSize: "18px",
          fontWeight: "500",
          lineHeight: "1.6",
          marginBottom: "30px",
          padding: "40px 120px",
          borderRadius: "20px",
          boxShadow: "2px 4px 4px rgba(0, 0, 0, 0.2)",
          backgroundColor: colors.primary,
          color: "#ccc",
          position: "relative",
        }}
      >
        <ExportButton data={summary} selected={0} />
        <h1 style={{ color: "#F5EDED",fontWeight: "bolder",fontSize: "40px" }}>Summary:</h1>
        <style>{`
          ul {
            list-style-type: disc;
            margin-bottom: 20px;
            padding-left: 20px;
          }

          ol {
            list-style-type: disc;
            margin-bottom: 20px;
            padding-left: 20px;
          }

          li {
            margin-bottom: 6px;
          }

          strong {
            font-weight: bold;
            font-size: 26px;
            color: ${colors.tertiary};
            margin-bottom: 20px;
          }

          p {
            margin-bottom: 20px;
            font-size: 18px;
            font-weight: 600;
          }
        `}</style>
        <ReactMarkdown
          children={newData}
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
              <li style={{ marginBottom: "10px", color: "#ccc",fontSize: "20px" }} {...props} />
            ),
            strong: ({ node, ...props }) => (
              <strong style={{ fontWeight: "bold", color: colors.tertiary }} {...props} />
            ),
          }}
        />
      </Col>
    </Row>
  );
};

export default Summarization;
