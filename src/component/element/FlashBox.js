import React from 'react'
//import { Link } from 'react-router-dom'
import LibFlash from '../../lib/LibFlash';
import LibAuth from '../../lib/LibAuth';
//
class FlashBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { flash:{success:"", error:""} };
  }
  async componentDidMount(){
    try {
      const uid = LibAuth.get_uid()
      const res = await LibFlash.get_flash(uid)
      this.setState({flash :res})
//console.log(res)
    } catch (error) {
      alert("Error, componentDidMount")
      console.error(error);
    }     
  }  
  render(){
//console.log(this.state.flash)
    return(
    <div>
      {this.state.flash.success? (
        <div className="flash_message bg-success text-white text-center py-2">
          {this.state.flash.success}
        </div>
      ) 
      : ""}
    </div>
    )
  }
}
export default FlashBox;
