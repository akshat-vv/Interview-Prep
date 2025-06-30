import FileExplorer from "./FileExplorer";

const FileExplorerWrapper = ({ fullTree, updateTree }) => {
  if (Array.isArray(fullTree)) {
    return fullTree.map((node) => (
      <FileExplorer
        key={node.id}
        node={node}
        fullTree={fullTree}
        updateTree={updateTree}
      />
    ));
  }

  return (
    <FileExplorer
      node={fullTree}
      fullTree={fullTree}
      updateTree={updateTree}
    />
  );
};

export default FileExplorerWrapper;