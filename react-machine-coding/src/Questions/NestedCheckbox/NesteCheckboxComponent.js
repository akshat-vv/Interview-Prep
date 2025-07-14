import React from "react";
import { CheckboxLabel } from "./CheckboxLabel";

const NesteCheckboxComponent = ({ data, setCheckboxState, fullTree }) => {
  const traverse = (
    targetId,
    node,
    isDescendant = false,
    ancestorStatus = ""
  ) => {
    const isTarget = node.id === targetId;
    const shouldUpdateStatus = isTarget || isDescendant;

    const toggledStatus = node.status === "checked" ? "unchecked" : "checked";
    const newStatus = isDescendant
      ? ancestorStatus
      : isTarget
      ? toggledStatus
      : node.status;

    // First update all children
    const updatedChildren = node.children?.map((child) =>
      traverse(targetId, child, isTarget || isDescendant, newStatus)
    ) ?? [];

    // Then decide status for current node
    let finalStatus = shouldUpdateStatus ? newStatus : node.status;

    if (!shouldUpdateStatus && updatedChildren.length > 0) {
      const allChecked = updatedChildren.every((child) => child.status === "checked");
      const noneChecked = updatedChildren.every((child) => child.status === "unchecked");

      if (allChecked) finalStatus = "checked";
      else if (!noneChecked) finalStatus = "indeterminate";
      else finalStatus = "unchecked";
    }

    return {
      ...node,
      status: finalStatus,
      children: updatedChildren,
    };
  };

  const handleChange = (targetId) => {
    const updatedTree = fullTree.map((rootNode) =>
      traverse(targetId, rootNode)
    );
    setCheckboxState(updatedTree);
  };

  return (
    <div>
      {data.map((node) => (
        <div key={node.id} style={{ marginLeft: "20px" }}>
          <CheckboxLabel
            id={node.id}
            label={node.label}
            status={node.status}
            handleChange={handleChange}
          />
          {node.children && (
            <NesteCheckboxComponent
              data={node.children}
              fullTree={fullTree}
              setCheckboxState={setCheckboxState}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default NesteCheckboxComponent;
