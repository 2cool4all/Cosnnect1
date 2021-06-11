import firebase from '../../firebase/config';



export const AddProf = async(name, email,deptartment, uid, profileImg) =>{
    try {
        return await firebase.database().ref('professors/' + uid).set({
            name: name,
            email:email,
            deptartment: deptartment,
            uuid: uid,
            profileImg: profileImg,
        });
    
    
    }catch (error){
        return error;
    }
};


export const UpdateProf = async(uuid, imgSource) => {
    try{
        return await firebase.database().ref('professors/' + uuid)
        .update({
            profileImg: imgSource,
        });
    } catch (error){
        return error;
    }
};