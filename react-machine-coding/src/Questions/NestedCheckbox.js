import React, { useState } from "react";

const initialTree = [
  {
    id: "p1",
    label: "Parent 1",
    checked: false,
    children: [
      { id: "c1", label: "Child 1", checked: false, children:[{id:'c5', label:'Grand Child 1', checked: false}] },
      { id: "c2", label: "Child 2", checked: false },
    ],
  },
  {
    id: "p2",
    label: "Parent 2",
    checked: false,
    children: [
      { id: "c3", label: "Child 3", checked: false },
      { id: "c4", label: "Child 4", checked: false },
    ],
  },
  {
    id: "p3",
    label: "Parent 3",
    checked: false,
    children:[
            { id: "c5", label: "Child 3", checked: false },
      { id: "c6", label: "Child 4", checked: false },
    ]
  },
];

function NestedCheckbox() {
  const [tree, setTree] = useState(initialTree);

  const handleCheck = (id, isChecked, isParent = false) => {
    const updateTree = (nodes) =>
      nodes.map((node) => {
        if (node.id === id) {
          // Handle parent check
          if (isParent) {
            return {
              ...node,
              checked: isChecked,
              children: node.children.map((child) => ({
                ...child,
                checked: isChecked,
              })),
            };
          } else {
            return { ...node, checked: isChecked };
          }
        }

        // If it's a parent, update children recursively
        if (node.children) {
          const updatedChildren = updateTree(node.children);
          const allChecked = updatedChildren.every((c) => c.checked);
          const someChecked = updatedChildren.some((c) => c.checked);
          return {
            ...node,
            checked: allChecked,
            indeterminate: !allChecked && someChecked,
            children: updatedChildren,
          };
        }

        return node;
      });

    setTree(updateTree(tree));
  };

  const renderTree = (nodes) =>
    nodes.map((node) => {
      const isParent = !!node.children;
      return (
        <div key={node.id} style={{ marginLeft: isParent ? 0 : 20 }}>
          <input
            type="checkbox"
            checked={node.checked}
            ref={(el) => {
              if (el && node.indeterminate !== undefined) {
                el.indeterminate = node.indeterminate;
              }
            }}
            onChange={(e) => handleCheck(node.id, e.target.checked, isParent)}
          />
          {node.label}
          {node.children && renderTree(node.children)}
        </div>
      );
    });

  return <div>{renderTree(tree)}</div>;
}

export default NestedCheckbox;
