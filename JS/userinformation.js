function addUserInformation() {

    // GitHub Pages root path
    const basePath = "Config/userinformation.txt";

    fetch(basePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load user information: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {

            const lines = data
                .split('\n')
                .map(line => line.trim())
                .filter(line => line !== "");

            const [profilePicUrl, profileName, profileRole, location, ...socials] = lines;


            const container = document.querySelector('.top-container');

            if (!container) {
                console.error("Top container not found.");
                return;
            }


            // Prevent duplicate user panels
            if (container.querySelector(".user-info-panel")) {
                return;
            }


            const userInfoPanel = document.createElement("div");
            userInfoPanel.className = "user-info-panel";


            // Profile image
            const img = document.createElement("img");
            img.src = profilePicUrl;
            img.alt = "Profile Picture";
            img.className = "profile-pic";
            userInfoPanel.appendChild(img);


            // Name link
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
            const userLocationContainer = document.createElement("div");
            userLocationContainer.className = "user-location-container";


            const locationIcon = document.createElement("span");
            locationIcon.className = "material-symbols-outlined";
            locationIcon.textContent = "near_me";

            userLocationContainer.appendChild(locationIcon);


            const userLocation = document.createElement("h2");
            userLocation.textContent = location;

            userLocationContainer.appendChild(userLocation);
            userInfoPanel.appendChild(userLocationContainer);



            // Social icons
            const socialIcons = document.createElement("div");
            socialIcons.className = "social-icons";


            const socialIconMap = {
                'x.com': "fa-brands fa-x-twitter",
                'facebook.com': "fa-brands fa-square-facebook",
                'discord.com': "fa-brands fa-discord",
                'discord.gg': "fa-brands fa-discord",
                'dsc.gg': "fa-brands fa-discord",
                'instagram.com': "fa-brands fa-instagram",
                'youtube.com': "fa-brands fa-youtube",
                'linkedin.com': "fab fa-linkedin",
                'artstation.com': "fa-brands fa-artstation",
                'github.com': "fab fa-github",
                'wordpress.com': "fab fa-wordpress",
                'vimeo.com': "fab fa-vimeo",
                'behance.net': "fab fa-behance",
                'twitch.tv': "fab fa-twitch",
                'steamcommunity.com': "fab fa-steam",
                'email': "fas fa-envelope"
            };


            socials.forEach(social => {

                let url = social;
                let socialType = Object.keys(socialIconMap)
                    .find(key => social.includes(key));


                // If no website matches, assume email
                if (!socialType) {
                    socialType = "email";
                    url = `mailto:${social}`;
                }


                const a = document.createElement("a");
                a.href = url;

                // Only open external links in new tab
                if (!url.startsWith("mailto:")) {
                    a.target = "_blank";
                }


                const icon = document.createElement("i");
                icon.className = socialIconMap[socialType];

                a.appendChild(icon);
                socialIcons.appendChild(a);
            });


            userInfoPanel.appendChild(socialIcons);


            container.insertBefore(
                userInfoPanel,
                container.querySelector(".navigation-buttons")
            );

        })
        .catch(error => console.error("Error loading user information:", error));
}



document.addEventListener(
    "DOMContentLoaded",
    addUserInformation
);
