import LibSession from '../lib/LibSession';
//
const LibFlash = {
  set_flash: async function(user_id , flash){
    try {
      const res = await LibSession.set_session(user_id , "flash", flash)
      return res
    } catch (error) {
      alert("Error, set_flash")
      console.error(error);
    }    
  },
  get_flash: async function(user_id){
    try {
      var ret = {success:"", error:""}
      const res = await LibSession.get_session(user_id , "flash")
      if(res != null){
        ret = res
      }
      await LibSession.delete_session(user_id , "flash")
      return ret
    } catch (error) {
      alert("Error, set_flash")
      console.error(error);
    }    
  },
}
export default LibFlash