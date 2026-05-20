// Team data from CSV - Updated directly from CSV source
const teamData = [
  {
    name: "Bhavesh Rout",
    contact: "9667017285",
    discord: "@bashoranges",
    skills: ["Full Stack Web", "Automation", "ML", "Ui/Ux"],
    links: {
      instagram: "https://www.instagram.com/bhaveshballpen/",
      github: "https://github.com/bhavesh676767",
      linkedin: "https://www.linkedin.com/in/bhavesh-rout-9b3782382/"
    },
    image: "https://cdn.discordapp.com/attachments/1284568055644553303/1505518387881709568/content.png?ex=6a0aeac2&is=6a099942&hm=ce8aad1c42617e8f60886aed6271fbfd5960dc79b40e2a3751a29b60337b29cd&",
    role: "PRESIDENT",
    isPresident: true
  },
  {
    name: "Namish Dawar",
    contact: "9873766230",
    discord: "@namishhaha",
    skills: ["WebDev", "Robotics", "Programming", "STEM"],
    links: {
      instagram: "https://www.instagram.com/namish_dawar/",
      github: "https://github.com/dawarnamish28-cell",
      linkedin: "https://www.linkedin.com/in/namish-dawar-3b337a395"
    },
    image: "https://media.discordapp.net/attachments/1284568055644553303/1505508597273202779/namish.jpeg?ex=6a0ae1a4&is=6a099024&hm=d7a1a9b712a9d3a998aafa7cde4db7cc053febcbd507f50ce068e6e841f77d54&=&format=webp&width=523&height=930",
    role: "INCHARGE"
  },
  {
    name: "Manas",
    contact: "9821266392",
    discord: "@manasmads1",
    skills: ["WebDev", "AI", "Video Editing", "Creative Designing"],
    links: {
      instagram: "https://www.instagram.com/manasarts_1/",
      github: "https://github.com/Manasmads1",
      linkedin: "https://www.linkedin.com/in/manasmads1/"
    },
    image: "https://cdn.discordapp.com/attachments/1505686652805320925/1505876609972961290/image.png?ex=6a0c3861&is=6a0ae6e1&hm=2e7e63f0e3c1f0c93c8511ac2faba4e732eedf8f283c09a9110b022785cc4e06&",
    role: "INCHARGE"
  },
  {
    name: "Sampada Bhatia",
    contact: "9868892931",
    discord: "_sampadaaa_",
    skills: ["Public Speaking", "Video Editing", "Writing"],
    links: {
      instagram: "https://www.instagram.com/_sampada.aaaa_/",
      linkedin: "https://www.linkedin.com/in/sampada-bhatia-342974390"
    },
    image: "https://media.discordapp.net/attachments/1284568055644553303/1505514105438601236/image.png?ex=6a0ae6c5&is=6a099545&hm=8426c1afc03989c5d05c3dbe13c4a3ddb6d357040bfa0aa6816ce1d1dd650963&=&format=webp&quality=lossless&width=784&height=881",
    role: "INCHARGE"
  },
  {
    name: "Aazim",
    contact: "8595805725",
    discord: "@_._aazim_",
    skills: ["3D Modeling", "UI/UX", "Gaming", "Animation", "Editing"],
    links: {
      instagram: "https://www.instagram.com/_._aazim_/",
      reddit: "https://www.reddit.com/user/Acceptable-Cheek7184/",
      linkedin: "https://www.linkedin.com/in/mohd-aazim-42523a3b7/"
    },
    image: "https://media.discordapp.net/attachments/1505686652805320925/1505931900693254164/content.png?ex=6a0c6bdf&is=6a0b1a5f&hm=22f1cd711549b0f4dbd4a450c048bf4b599adc7564fd760750832fd545478ee9&=&format=webp&quality=lossless&width=524&height=930",
    role: "INCHARGE"
  },
  {
    name: "Yashvardhan",
    contact: "9599207500",
    discord: "_whoisyash_",
    skills: ["Maths", "Physics", "Electronics", "Gaming", "Video editing"],
    links: {},
    image: "https://cdn.discordapp.com/attachments/1505686652805320925/1505978694768922664/05862949-f420-4765-997b-29042783560f.png?ex=6a0c9774&is=6a0b45f4&hm=ac10e36032b43931bdbf14955f3b67739f0460afe9387170b2a44f4cf3d8ecca&",
    role: "INCHARGE"
  },
  {
    name: "Pranav Goel",
    contact: "9350017174",
    discord: "spysour",
    skills: ["Gaming", "writing", "storytelling", "visual branding"],
    links: {},
    image: "https://media.discordapp.net/attachments/1505686652805320925/1505901122068680784/content.png?ex=6a0c4f35&is=6a0afdb5&hm=71b419896feb1e9ade3aff55f5212bd7ad43446ed3d6eb581a973913123ca13d&=&format=webp&quality=lossless&width=693&height=930",
    role: "INCHARGE"
  },
  {
    name: "Nikumbh Rathi",
    contact: "7303040825",
    discord: "nikumbh_2026",
    skills: ["Gaming", "Video editing", "Maths", "Creative Designing"],
    links: {
      github: "https://github.com/Nikumbh-Rathi",
      linkedin: "https://www.linkedin.com/in/gaming-mmn-5891ba262/"
    },
    image: "https://media.discordapp.net/attachments/1431981416832434336/1505963169460387971/image.png?ex=6a0c88ff&is=6a0b377f&hm=1096b40366aef0a5f12e811e107c467d5c462d807f7bb6164391faa7a2ccfe26&=&format=webp&quality=lossless&width=501&height=919",
    role: "INCHARGE"
  },
  {
    name: "Shaurya Chauhan",
    contact: "9953791968",
    discord: "shaurya.exe",
    skills: ["Gaming", "python", "programming", "Sound engineering"],
    links: {},
    image: "https://cdn.discordapp.com/attachments/1505686652805320925/1505930716364411020/content.png?ex=6a0c6ac5&is=6a0b1945&hm=e01f549170d5617a5500dd7f4a985390104e12658a5468581cb9cf68e3a052a7&",
    role: "INCHARGE"
  },
  {
    name: "Arnab Anand",
    contact: "9667947917",
    discord: "a._.rnab",
    skills: ["Photo and Videography", "Video editing", "Gaming"],
    links: {},
    image: "https://media.discordapp.net/attachments/1505686652805320925/1505874214031200377/IMG_7638.JPG.jpeg?ex=6a0c3626&is=6a0ae4a6&hm=6a65568a36dbd37e9cf22c43f5afeb1c285a81ceff20e05e24d05d986c275a6e&=&format=webp&width=698&height=930",
    role: "INCHARGE"
  },
  {
    name: "Vinamrata Chawla",
    contact: "8595761519",
    discord: "_.vinamratachawla._",
    skills: ["Public Speaking", "Poetry", "Social Media Management", "Marketing"],
    links: {
      instagram: "https://www.instagram.com/vinamrataaa__/",
      linkedin: "https://www.linkedin.com/in/vinamrata-chawla-11951840b/"
    },
    image: "https://cdn.discordapp.com/attachments/1284568055644553303/1505569805728743466/41191d15-d867-48ac-b0df-9a257519bfaf.png?ex=6a0b1aa5&is=6a09c925&hm=6dc529b6a9a2fad58eb37283dc704e94b3599f5dacf52aac9ffa3d1022964d90&",
    role: "INCHARGE"
  },
  {
    name: "Yuvraj",
    contact: "9667216400",
    discord: "yuvrxj_3",
    skills: ["Robotics", "App development", "Web development", "Physics"],
    links: {},
    image: "https://media.discordapp.net/attachments/1505686652805320925/1505882712177901679/2bb9aa38-8974-4bcf-95b8-78fb01f433bc.png?ex=6a0c3e10&is=6a0aec90&hm=0c6a449c53c8ed73fec42b59614fe2ef029e00a1a2bd1a50fd89a5425dc2a87a&=&format=webp&quality=lossless&width=523&height=930",
    role: "INCHARGE"
  },
  {
    name: "Aarav",
    contact: "9540151007",
    discord: "_._avvy",
    skills: ["Gaming", "Blender", "Film-making", "Public speaking", "Editing", "Animation"],
    links: {
      instagram: "https://www.instagram.com/totallynot_axxav/",
      reddit: "https://www.reddit.com/user/Alarmed-Composer-448/",
      linkedin: "https://www.linkedin.com/in/aarav-yadav-a9676240b/"
    },
    image: "https://cdn.discordapp.com/attachments/1505686652805320925/1505872304196947988/c1ee8175-999a-400b-8e07-0f1a057781c2.png?ex=6a0c345f&is=6a0ae2df&hm=25fb05aa1f6a41ab90f4f17eb0665411d70fcefebfc005b88502fc4d22ef33ff",
    role: "INCHARGE"
  },
  {
    name: "Danda Gyanada",
    contact: "9910587855",
    discord: "gyanada_19",
    skills: ["Public Speaking", "Canva", "Blender", "Creative Writing"],
    links: {},
    image: "https://media.discordapp.net/attachments/1505686652805320925/1505879634020007967/a99c031a-7bee-4235-aa2b-34e9c148cc9f.png?ex=6a0c3b32&is=6a0ae9b2&hm=c27bc9a41030caf4b9eb16057b714968855987769e324f52914752e8b697b6ee&=&format=webp&quality=lossless&width=698&height=930",
    role: "INCHARGE"
  }
];

// Function to get social media icon class
function getSocialIcon(platform) {
  const icons = {
    instagram: 'fab fa-instagram',
    github: 'fab fa-github',
    linkedin: 'fab fa-linkedin-in',
    reddit: 'fab fa-reddit-alien'
  };
  return icons[platform] || 'fab fa-link';
}

// Function to get social media title
function getSocialTitle(platform) {
  return platform.charAt(0).toUpperCase() + platform.slice(1);
}

// Function to generate team card HTML with optimized image loading
function generateTeamCard(member) {
  const presidentialClass = member.isPresident ? ' president' : '';
  const presidentialBadge = member.isPresident ? '<div class="president-badge">President</div>' : '';
  
  // Generate skills tags
  const skillsHTML = member.skills
    .map(skill => {
      const tagClass = member.isPresident ? 'red-tag' : 'lime-tag';
      return `<span class="tag ${tagClass}">${skill.toUpperCase()}</span>`;
    })
    .join('');
  
  // Generate social links - only include if links exist
  let linksHTML = '';
  const linkPlatforms = Object.keys(member.links).filter(platform => member.links[platform]);
  
  if (linkPlatforms.length > 0) {
    linksHTML = linkPlatforms
      .map(platform => {
        const iconClass = getSocialIcon(platform);
        const title = getSocialTitle(platform);
        const linkClass = member.isPresident ? 'red-link' : 'lime';
        return `<a href="${member.links[platform]}" target="_blank" class="ol ${linkClass}" title="${title}"><i class="${iconClass}"></i></a>`;
      })
      .join('');
  }
  
  return `
    <div class="card${presidentialClass}">
      ${presidentialBadge}
      <img class="card-photo" 
           src="${member.image}" 
           alt="${member.name}" 
           loading="lazy"
           decoding="async"
           width="300"
           height="400">
      <div class="card-info">
        <div class="card-name">${member.name}</div>
        <div class="card-role"${member.isPresident ? ' style="color:rgba(220,60,60,.8);letter-spacing:2px"' : ''}>${member.role}</div>
      </div>
      <div class="card-overlay">
        <div class="skills-row">
          ${skillsHTML}
        </div>
        ${linksHTML ? `<div class="overlay-links">${linksHTML}</div>` : ''}
      </div>
    </div>
  `;
}

// Initialize team grid when DOM is ready
function initTeamGrid() {
  const gridContainer = document.querySelector('.grid');
  
  if (gridContainer) {
    gridContainer.innerHTML = teamData.map(generateTeamCard).join('');
    
    // Add entrance animations
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
      // Set initial state
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      
      // Trigger animation after preloader hides
      setTimeout(() => {
        card.classList.add('in');
      }, index * 70 + 200);
    });
  }
}

// Trigger when page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTeamGrid);
} else {
  initTeamGrid();
}

// Scroll reveal with Intersection Observer
function observeCards() {
  const io = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  
  document.querySelectorAll('.card').forEach(card => {
    io.observe(card);
  });
}

// Wait for preloader animation, then observe cards
window.addEventListener('load', () => {
  setTimeout(observeCards, 1200);
});
