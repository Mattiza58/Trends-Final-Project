import LargeText from "../components/largetext";
import ProfileCard from "../components/profilecard";
import {UserProps} from "../types.ts";
import { getAuth } from "firebase/auth";

// name = "Matthew Izaguirre" user_name="@mattiza58" followers= {375} following={371} location="Ithaca, NY" instruments="Guitar, Bass" genres="Rock, Metal, Indie" yrs_experience="4+ Years Experience"


const Profile = (() =>{
    const auth = getAuth();
    const user = auth.currentUser;

    const props: UserProps = {name: user?.displayName, user_name: "@mattiza58", followers: 375, following: 371, location: "Ithaca, NY", instruments: "Guitar, Bass", genres: "Rock, Metal, Indie", yrs_experience: "4+ Years" }

    return <div>
        <LargeText link = "Profile"/>

        <ProfileCard {...props}/>

    </div>
})

export default Profile;