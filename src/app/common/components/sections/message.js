import React from 'react'
import { List, Icon, Avatar } from 'antd';

function Message(props) {
    const AvatarSrc = props.who === 'Bot' ? <Icon type="robot" /> : <Icon type="smile" />
    if(props.who === "Bot") {
        return (
          <div className="left-aligin animation">
              <List.Item>
                {/* {props.who} */}
                <div className="react-chatbot-bot-avatar-container react-chatbot">
                    {<Avatar icon={AvatarSrc} />}
                    {/* <img className="rsc-ts-image sc-gzVnrw cwuCQv" src="data:image/svg+xml,%3csvg version='1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3e%3cpath d='M303 70a47 47 0 1 0-70 40v84h46v-84c14-8 24-23 24-40z' fill='%2393c7ef'/%3e%3cpath d='M256 23v171h23v-84a47 47 0 0 0-23-87z' fill='%235a8bb0'/%3e%3cpath fill='%2393c7ef' d='M0 240h248v124H0z'/%3e%3cpath fill='%235a8bb0' d='M264 240h248v124H264z'/%3e%3cpath fill='%2393c7ef' d='M186 365h140v124H186z'/%3e%3cpath fill='%235a8bb0' d='M256 365h70v124h-70z'/%3e%3cpath fill='%23cce9f9' d='M47 163h419v279H47z'/%3e%3cpath fill='%2393c7ef' d='M256 163h209v279H256z'/%3e%3cpath d='M194 272a31 31 0 0 1-62 0c0-18 14-32 31-32s31 14 31 32z' fill='%233c5d76'/%3e%3cpath d='M380 272a31 31 0 0 1-62 0c0-18 14-32 31-32s31 14 31 32z' fill='%231e2e3b'/%3e%3cpath d='M186 349a70 70 0 1 0 140 0H186z' fill='%233c5d76'/%3e%3cpath d='M256 349v70c39 0 70-31 70-70h-70z' fill='%231e2e3b'/%3e%3c/svg%3e" alt="The bot's avatar"></img> */}
                </div>
                  <div className="bot-color">
                  <List.Item.Meta 
                      description={props.text}
                  />  
                  </div>
              </List.Item>
          </div>
        )
    } else {
        return (
            <div className="right-align animation">
                <List.Item>
                    <div className="user-color">
                    <List.Item.Meta 
                        description={props.text}
                    />
                    </div>
                    <div className="react-chatbot-user-avatar-container react-chatbot" style={{borderRadius: '50% 50% 50% 0'}}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="react-chatbot-user-avatar-icon">
                            <path d="M256 288c79.5 0 144-64.5 144-144S335.5 0 256 0 112 64.5 112 144s64.5 144 144 144zm128 32h-55.1c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16H128C57.3 320 0 377.3 0 448v16c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48v-16c0-70.7-57.3-128-128-128z"></path>
                        </svg>
                    </div>

                </List.Item>
            </div>
        )
    }
}

export default Message
