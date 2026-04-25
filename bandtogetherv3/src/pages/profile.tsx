
import LargeText from "../components/largetext";
import ProfileCard from "../components/profilecard";


const Profile = (() =>{



    return <div>
        <LargeText link = "Profile"/>

        <ProfileCard name = "Matthew Izaguirre" user_name="@mattiza58" followers= {375} following={371} location="Ithaca, NY" instruments="Guitar, Bass" genres="Rock, Metal, Indie" yrs_experience="4+ Years Experience" />

    </div>
})

export default Profile;