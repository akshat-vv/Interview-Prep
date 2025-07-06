import React, { useState } from "react";
import CustomDropdown from "./CustomDropdown";

const options = [
  { name: "Home" },
  { name: "Account" },
  { name: "Login" },
  { name: "Option 4" },
];

const CustomDropdownExample = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <div>
      <p>{selectedItem ? selectedItem.name : "Selected Item Label"}</p>
      <CustomDropdown
        options={options}
        selectedItem={selectedItem}
        onSelect={(item) => setSelectedItem(item)}
      />
    </div>
  );
};

export default CustomDropdownExample;
