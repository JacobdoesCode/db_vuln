import React from 'react'

export default function Banner(props)
{
    const { login_info, error, is_visible } = props;
    
    return (
      <div
        style={is_visible === true ?  { display: 'block' } : { display: 'none' }}
      >
        { error ?
        "The username and password you entered did not match our records. Please try again.": 
        `Successfully logged in as ${login_info}`
        } 
      </div>
    );
}