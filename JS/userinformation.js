function addUserInformation() {

    const basePath = "Config/userinformation.txt";

    fetch(basePath)
        .then(response => {

            if (!response.ok) {
                throw new Error("Could not load user information");
            }

            return response.text();

        })
        .then(data => {


            const lines = data
                .split("\n")
                .map(line => line.trim())
                .filter(line => line !== "");


            const [
                profilePicUrl,
                profileName,
                profileRole,
                location,
                ...socials
            ] = lines;



            const container = document.querySelector(".top-container");


            if (!container) {
                console.error("top-container not found");
                return;
            }


            // Prevent duplicates
            if (document.querySelector(".user-info-panel")) {
                return;
            }



            const userInfoPanel = document.createElement("div");
            userInfoPanel.className = "user-info-panel";



            // Profile picture

            const img = document.createElement("img");
            img.src = profilePicUrl;
            img.alt = "Profile Picture";
            img.className = "profile-pic";

            userInfoPanel.appendChild(img);



            // Name

            const userNameLink = document.createElement("a");

            userNameLink.href = "index.html";
            userNameLink.className = "user-name-link";


            const userName = document.createElement("h1");

            userName.className = "user-name";
            userName.textContent = profileName;


            userNameLink.appendChild(userName);

            userInfoPanel.appendChild(userNameLink);



            // Role

            const userRole = document.createElement("h2");

            userRole.textContent = profileRole;

            userInfoPanel.appendChild(userRole);



            // Location

            const locationContainer = document.createElement("div");

            locationContainer.className = "user-location-container";


            const locationIcon = document.createElement("span");

            locationIcon.className = "material-symbols-outlined";
            locationIcon.textContent = "near_me";


            const userLocation = document.createElement("h2");

            userLocation.textContent = location;



            locationContainer.appendChild(locationIcon);
            locationContainer.appendChild(userLocation);


            userInfoPanel.appendChild(locationContainer);




            // Social icons

            const socialIcons = document.createElement("div");

            socialIcons.className = "social-icons";



            const iconMap = {

                "x.com": "fa-brands fa-x-twitter",
                "facebook.com": "fa-brands fa-square-facebook",
                "discord.com": "fa-brands fa-discord",
                "discord.gg": "fa-brands fa-discord",
                "instagram.com": "fa-brands fa-instagram",
                "youtube.com": "fa-brands fa-youtube",
                "linkedin.com": "fa-brands fa-linkedin",
                "artstation.com": "fa-brands fa-artstation",
                "github.com": "fa-brands fa-github",
                "twitch.tv": "fa-brands fa-twitch",
                "email": "fa-solid fa-envelope"

            };



            socials.forEach(social => {


                let type = Object.keys(iconMap)
                    .find(key => social.includes(key));


                let url = social;



                if (!type) {

                    type = "email";
                    url = "mailto:" + social;

                }



                const link = document.createElement("a");

                link.href = url;



                if (!url.startsWith("mailto:")) {

                    link.target = "_blank";

                }



                const icon = document.createElement("i");

                icon.className = iconMap[type];


                link.appendChild(icon);

                socialIcons.appendChild(link);


            });



            userInfoPanel.appendChild(socialIcons);



            // IMPORTANT:
            // Put profile before navigation buttons

            const navigation = container.querySelector(".navigation-buttons");


            container.insertBefore(
                userInfoPanel,
                navigation
            );


        })

        .catch(error => {

            console.error(
                "Error loading user information:",
                error
            );

        });

}



document.addEventListener(
    "DOMContentLoaded",
    addUserInformation
);
