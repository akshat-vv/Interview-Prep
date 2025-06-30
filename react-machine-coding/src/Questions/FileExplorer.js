import React, { useState } from "react";
import { v4 as uuid } from "uuid";

function addNodeById(tree, targetId, newNode) {
  if (Array.isArray(tree)) {
    return tree.map((node) => addNodeById(node, targetId, newNode));
  }

  if (tree.id === targetId && tree.isFolder) {
    return {
      ...tree,
      children: [...(tree.children || []), newNode],
    };
  }

  return {
    ...tree,
    children: tree.children?.map((child) => addNodeById(child, targetId, newNode)) || [],
  };
}

function removeNodeById(tree, targetId) {
  if (Array.isArray(tree)) {
    return tree
      .map((node) => removeNodeById(node, targetId))
      .filter(Boolean); // remove undefined nodes
  }

  if (tree.id === targetId) {
    return undefined;
  }

  const filteredChildren = tree.children
    ?.map((child) => removeNodeById(child, targetId))
    .filter(Boolean);

  return {
    ...tree,
    children: filteredChildren || [],
  };
}

const FileExplorer = ({ node, updateTree, fullTree }) => {
  const [expanded, setExpanded] = useState(false);
  if (!node) return null;

  const handleRemove = (targetId) => {
    const updatedTree = removeNodeById(fullTree, targetId);
    updateTree(updatedTree);
    setExpanded(true);
  };

  const handleAdd = (type) => {
    const name = prompt(`Enter ${type} name`);
    if (!name) return;

    const newNode = {
      id: uuid(),
      name,
      isFolder: type === "folder",
      ...(type === "folder" && { children: [] }),
    };

    const updatedTree = addNodeById(fullTree, node.id, newNode);
    updateTree(updatedTree);
    setExpanded(true);
  };

  return (
    <div style={{ paddingLeft: 20 }}>
      <div
        onClick={() => node.isFolder && setExpanded((prev) => !prev)}
        style={{ cursor: node.isFolder ? "pointer" : "default" }}
      >
        {node.isFolder ? (expanded ? "📂" : "📁") : "📄"} {node.name}
      </div>

      <>
        <div style={{ marginTop: 4 }}>
          <button onClick={() => handleAdd("file")}>+ File</button>{" "}
          <button onClick={() => handleAdd("folder")}>+ Folder</button>
          <button onClick={() => handleRemove(node.id)}>- Delete</button>
        </div>
        {expanded &&
          node.children?.map((child) => (
            <FileExplorer
              key={child.id}
              node={child}
              updateTree={updateTree}
              fullTree={fullTree}
            />
          ))}
      </>
    </div>
  );
};


export default FileExplorer;
