import React from 'react'
import "./all-sections.css";

const InformationComponent = (props) => {
    
    const options = [
        { text: props.informationInfo.fields.description.stringValue, 
          id: props.informationInfo.fields.id.stringValue
        },
    ];
    
    const onButtonClickHandler = () => {
        props.textQuery(options[0].text);
    };

    const optionsMarkup = options.map((option) => (
      <button
        key={option.id}
        className="admission-info-button"
        onClick={onButtonClickHandler}
      >
        {option.text}
      </button>
    ));
    
    return <div className="d-flex align-items-start flex-wrap admission-info-container">{optionsMarkup}</div>;
};

export default InformationComponent
