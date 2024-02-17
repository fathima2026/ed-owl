import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import React from "react";

function Viewer() {
    const docs = [
      { uri: "https://url-to-my-pdf.pdf" }, // Remote file
    // Local File
    ];
  
    return <DocViewer documents={docs} pluginRenderers={DocViewerRenderers} />;
  }

export default Viewer;