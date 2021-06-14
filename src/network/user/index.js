import firebase from '../../firebase/config';



export const AddUser = async(Fname, Lname, DoB, coourse, year, section, isStudent, isFaculty,  email,  uid, profileImg) =>{
    try {
        return await firebase.database().ref('users/' + uid).set({
            name: Fname + " " + Lname,
            dateOfBirth: DoB,
            course: coourse + "-" + year + "-" + section,
            email:email,
            isStudent: isStudent,
            isFaculty: isFaculty,
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

export const UpdateUserName = async(uuid, name) =>{
    try{
        return await firebase.database().ref('users/' + uuid)
        .update({
            name: name,
        });
    } catch (error){
        return error;
    }
}