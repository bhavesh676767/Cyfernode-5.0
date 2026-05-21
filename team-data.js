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
    image: "/images/team/bhavesh.png",
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
    image: "/images/team/namish.png",
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
    image: "/images/team/manas.png",
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
    image: "/images/team/sampada.png",
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
    image: "/images/team/aazim.png",
    role: "INCHARGE"
  },
  {
    name: "Yashvardhan",
    contact: "9599207500",
    discord: "_whoisyash_",
    skills: ["Maths", "Physics", "Electronics", "Gaming", "Video editing"],
    links: {},
    image: "/images/team/yashvardhan.png",
    role: "INCHARGE"
  },
  {
    name: "Pranav Goel",
    contact: "9350017174",
    discord: "spysour",
    skills: ["Gaming", "writing", "storytelling", "visual branding"],
    links: {},
    image: "/images/team/pranav.png",
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
    image: "/images/team/nikumbh.png",
    role: "INCHARGE"
  },
  {
    name: "Shaurya Chauhan",
    contact: "9953791968",
    discord: "shaurya.exe",
    skills: ["Gaming", "python", "programming", "Sound engineering"],
    links: {},
    image: "/images/team/shaurya.png",
    role: "INCHARGE"
  },
  {
    name: "Arnab Anand",
    contact: "9667947917",
    discord: "a._.rnab",
    skills: ["Photo and Videography", "Video editing", "Gaming"],
    links: {},
    image: "/images/team/arnab.png",
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
    image: "/images/team/vinamrata.png",
    role: "INCHARGE"
  },
  {
    name: "Yuvraj",
    contact: "9667216400",
    discord: "yuvrxj_3",
    skills: ["Robotics", "App development", "Web development", "Physics"],
    links: {},
    image: "/images/team/yuvraj.png",
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
    image: "/images/team/aarav.png",
    role: "INCHARGE"
  },
  {
    name: "Danda Gyanada",
    contact: "9910587855",
    discord: "gyanada_19",
    skills: ["Public Speaking", "Canva", "Blender", "Creative Writing"],
    links: {},
    image: "/images/team/gyanada.png",
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
