import React from 'react'
import { Card } from 'antd';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

function CardComponent(props) {
    return (
        <div className="d-flex justify-content-start animation">
            <Card
                style={{ maxWidth: 300 }}
                cover={
                    <img
                        alt={props.cardInfo.fields.description.stringValue}
                        src={props.cardInfo.fields.image.stringValue}
                    />
                }
                actions={[
                    <a 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        href={props.cardInfo.fields.link.stringValue}
                    >
                        <ArrowForwardIcon />
                    </a>
                ]}
            >
            </Card>
        </div>
    )
}

export default CardComponent
