import React, { useState } from "react";
import { usePopper } from "react-popper";
import styled from "styled-components";

const PopperContainer = styled.div`
  display: ${(props) => (props.visible ? "flex" : "none")};

  width: 200px;
  height: 85px;

  flex-direction: column;

  background-color: #ffffff;
  box-shadow: 1px 1px 10px rgba(84, 51, 255, 0.3);
  border-radius: 5px;
  padding: 12px;
`;

function Dropdown(props) {
  const [visible, setVisibility] = useState(false);

  const [referenceRef, setReferenceRef] = useState(null);
  const [popperRef, setPopperRef] = useState(null);

  const { styles, attributes } = usePopper(referenceRef, popperRef, {
    placement: "bottom",
    modifiers: [
      {
        name: "offset",
        enabled: true,
        options: {
          offset: [-10, -10],
        },
      },
    ],
  });

  function handleDropdownClick(event) {
    setVisibility(!visible);
  }

  return (
    <>
      <button ref={setReferenceRef} onClick={handleDropdownClick}>
        Click Me
      </button>
      <div ref={setPopperRef} style={styles.popper} {...attributes.popper}>
        <PopperContainer style={styles.offset} visible={visible}>
          hello
        </PopperContainer>
      </div>
    </>
  );
}

export default Dropdown;
