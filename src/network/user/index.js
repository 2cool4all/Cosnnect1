import firebase from '../../firebase/config';



export const AddUser = async(Fname, Lname, DoB, course, year, section,  email,  uid, profileImg) =>{
    try {
        return await firebase.database().ref('users/' + uid).set({
            name: Fname + " " + Lname,
            dateOfBirth: DoB,
            course: course + "-" + year + "-" + section,
            email:email,
            uuid: uid,
            profileImg: profileImg,
        });
    
    
    }catch (error){
        return error;
    }
};


export const UpdateUser = async(uuid, imgSource) => {
    try{
        return await firebase.database().ref('users/' + uuid)
        .update({
            profileImg: imgSource,
        });
    } catch (error){
        return error;
    }
};