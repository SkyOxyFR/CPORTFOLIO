document.addEventListener("DOMContentLoaded", () => {
    const page = document.body.dataset.page;
    const menuToggle = document.querySelector(".menu-toggle");
    const mobileNav = document.querySelector(".mobile-nav");
    const overlay = document.getElementById("overlay");
    const sidePanel = document.getElementById("side-panel");
    const closeBtn = document.getElementById("close-btn");
    const panelTitle = document.getElementById("panel-title");
    const panelMeta = document.getElementById("panel-meta");
    const panelLocation = document.getElementById("panel-location");
    const panelBody = document.getElementById("panel-body");

    const images = {
        server: "https://images.unsplash.com/photo-1775519520461-6b6e068d9250?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=70&w=1400",
        code: "https://images.unsplash.com/photo-1763568258458-ef825ca23fdd?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=70&w=1400",
        switch: "https://images.unsplash.com/photo-1750711731797-25c3f2551ff8?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=70&w=1400",
        nc: "https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=70&w=1400",
        cyber: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=70&w=1400"
    };

    const detailData = {
        "formation-iut": {
            title: "BUT Réseaux & Télécommunications",
            meta: "Septembre 2025 - Présent",
            location: "IUT Clermont Auvergne - Site d'Aubière",
            body: `
                <img class="panel-image zoomable" src="${images.server}" alt="Baies de serveurs et câblage réseau">
                <h3>Objectif de la formation</h3>
                <p>Le BUT Réseaux et Télécommunications forme des profils capables d'intervenir sur les réseaux informatiques, les télécommunications, l'administration système et la cybersécurité.</p>
                <h3>Pourquoi cette formation ?</h3>
                <p>J'ai choisi l'IUT d'Aubière pour consolider mes bases techniques à travers des cours, des TD, des TP et des projets concrets.</p>
                <h3>Position actuelle</h3>
                <p>Je suis actuellement en première année, avec l'objectif de progresser sur les fondamentaux réseau et sécurité.</p>
            `
        },
        "formation-bac": {
            title: "Baccalauréat Général",
            meta: "2024 - 2025",
            location: "Lycée François Mauriac",
            body: `
                <img class="panel-image zoomable" src="${images.code}" alt="Ordinateur affichant du code">
                <h3>Spécialités</h3>
                <p>Mathématiques et Numérique et Sciences de l'Informatique (NSI), avec mention Assez Bien.</p>
                <h3>Compétences acquises</h3>
                <p>Python, algorithmique, bases de données, compréhension du web et premières approches des problématiques de sécurité.</p>
            `
        },
        "formation-outremer": {
            title: "Scolarité en Outre-mer",
            meta: "2015 - 2024",
            location: "Tahiti - Nouvelle-Calédonie",
            body: `
                <img class="panel-image zoomable" src="${images.nc}" alt="Paysage côtier en Nouvelle-Calédonie">
                <h3>Contexte</h3>
                <p>J'ai vécu et étudié pendant près de 10 ans en Nouvelle-Calédonie et à Tahiti, où j'ai effectué l'intégralité de mon collège et une grande partie de mon lycée et de mon école primaire.</p>
                <h3>Apports personnels</h3>
                <p>Cette expérience m'a apporté une grande ouverture d'esprit, une capacité d'adaptation importante et une facilité à m'intégrer dans des environnements différents.</p>
            `
        },
        "skill-network": {
            title: "Réseaux Informatiques",
            meta: "Architecture & Administration",
            body: `
                <img class="panel-image zoomable" src="${images.switch}" alt="Switch réseau avec câbles Ethernet">
                ${accordion("Installation d'équipements réseaux", `
                    <p>Manipulation de switchs, routeurs et points d'accès, notamment avec du matériel Cisco, D-LINK et Aruba.</p>
                    <ul>
                        <li>Configuration CLI, sécurisation de base et gestion des ports.</li>
                        <li>Mise en place de VLAN, modes access/trunk et supervision.</li>
                        <li>Premières notions de routage avec RIP et OSPF.</li>
                    </ul>
                `)}
                ${accordion("Services réseau", `
                    <p>Configuration de services et mécanismes nécessaires à la connectivité.</p>
                    <ul>
                        <li>NAT, PAT et DNAT.</li>
                        <li>DHCP, DNS et adressage IP.</li>
                    </ul>
                `)}
                ${accordion("Virtualisation", `
                    <p>Utilisation d'environnements virtualisés pour simuler des architectures et tester des configurations.</p>
                    <ul>
                        <li>VirtualBox et VMware.</li>
                        <li>Déploiement de systèmes Linux Debian et Windows Server.</li>
                    </ul>
                `)}
            `
        },
        "skill-telecom": {
            title: "Télécommunications",
            meta: "Signaux & Transmission",
            body: `
                <img class="panel-image zoomable" src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=70&w=1400" alt="Carte électronique">
                ${accordion("Oscilloscope", `
                    <p>Utilisation pour visualiser et analyser des signaux électriques.</p>
                    <ul>
                        <li>Mesure de l'amplitude, de la période et de la fréquence.</li>
                        <li>Observation temporelle pour vérifier l'intégrité d'un signal.</li>
                    </ul>
                `)}
                ${accordion("GBF", `
                    <p>Génération de signaux pour tester des chaînes de transmission.</p>
                    <ul>
                        <li>Configuration de signaux sinusoïdaux, carrés ou triangulaires.</li>
                        <li>Réglage précis de la fréquence et de la tension.</li>
                    </ul>
                `)}
            `
        },
        "skill-code": {
            title: "Programmation",
            meta: "Développement & Scripting",
            body: `
                <img class="panel-image zoomable" src="${images.code}" alt="Code sur ordinateur portable">
                ${accordion("Web", `
                    <p>Création d'interfaces web propres et responsives.</p>
                    <ul>
                        <li>HTML5 et CSS3 pour la structure et le design.</li>
                        <li>JavaScript pour l'interactivité côté client.</li>
                    </ul>
                `)}
                ${accordion("Bash", `
                    <p>Utilisation de la ligne de commande Linux et écriture de scripts simples pour automatiser des tâches.</p>
                `)}
                ${accordion("Python", `
                    <p>Algorithmique, traitement de données et automatisation de processus techniques.</p>
                `)}
            `
        },
        "skill-telephony": {
            title: "Téléphonie IP",
            meta: "VoIP & Communications",
            body: `
                <img class="panel-image zoomable" src="${images.switch}" alt="Équipement réseau connecté">
                ${accordion("Infrastructure VoIP", `
                    <p>Mise en place d'une infrastructure basée sur Xivo/Asterisk, avec serveur d'appel et terminaux variés.</p>
                `)}
                ${accordion("Configuration des terminaux", `
                    <p>Configuration de téléphones SIP, softphones, DECT via borne et téléphone analogique via adaptateur ATA.</p>
                `)}
                ${accordion("Trunk SIP & services", `
                    <p>Gestion d'appels entrants/sortants, groupes d'appel, renvoi, messagerie vocale et conférence.</p>
                `)}
            `
        },
        "skill-qualities": {
            title: "Qualités Humaines",
            meta: "Adaptabilité, organisation, patience",
            body: `
                <img class="panel-image zoomable" src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=70&w=1400" alt="Collaboration professionnelle">
                <h3>Adaptabilité</h3>
                <p>Mes expériences en Nouvelle-Calédonie, à Tahiti et en métropole m'ont habitué à changer d'environnement, à reconstruire mes repères et à m'intégrer rapidement.</p>
                <h3>Organisation</h3>
                <p>Pour avancer sur des projets en parallèle des cours, je découpe les objectifs en tâches courtes, priorisées et vérifiables.</p>
                <h3>Patience</h3>
                <p>Face aux bugs ou aux configurations difficiles, je progresse par tests successifs et diagnostic méthodique.</p>
            `
        },
        "project-hackagou": {
            title: "HackAgou.NC",
            meta: "Cybersécurité & CTF",
            body: `
                <img class="panel-image zoomable" src="${images.cyber}" alt="Circuit électronique et sécurité numérique">
                <h3>Contexte</h3>
                <p>En 2023, lorsque j'étais scolarisé en seconde à Nouméa, le lycée nous a présenté ce concours. Je m'y suis inscrit avec deux amis.</p>
                <h3>Objectif</h3>
                <p>Résoudre des challenges de cybersécurité en retrouvant des chaînes de caractères cachées dans différents environnements.</p>
                <h3>Travail réalisé</h3>
                <ul>
                    <li>Création de scripts Bash pour automatiser certaines étapes.</li>
                    <li>Utilisation d'outils de scan pour identifier des failles potentielles.</li>
                </ul>
                <h3>Résultat</h3>
                <p>32e sur 82 équipes en 2025, 54e sur 88 en 2024, et 67e sur 96 en 2023.</p>
            `
        },
        "project-mapnc": {
            title: "Map.NC",
            meta: "Site web & Database",
            body: `
                <img class="panel-image zoomable" src="${images.nc}" alt="Paysage de Nouvelle-Calédonie">
                <h3>Contexte</h3>
                <p>En 2024, durant les événements politiques en Nouvelle-Calédonie, ma classe de NSI a lancé un site pour faciliter le partage rapide d'informations locales.</p>
                <h3>Objectif</h3>
                <p>Créer une carte interactive communautaire pour localiser en temps réel des zones sinistrées, barrages ou points de ravitaillement.</p>
                <h3>Travail réalisé</h3>
                <ul>
                    <li>Développement front-end en HTML, CSS et JavaScript.</li>
                    <li>Mise en place d'une base MySQL pour stocker les points.</li>
                    <li>Création d'un backend PHP pour gérer les signalements.</li>
                </ul>
                <h3>Résultat</h3>
                <p>Une plateforme web opérationnelle pour améliorer la circulation d'informations critiques.</p>
            `
        },
        "project-portfolio": {
            title: "Portfolio V1",
            meta: "Développement Front-End",
            body: `
                <img class="panel-image zoomable" src="${images.code}" alt="Développement front-end sur ordinateur">
                <h3>Contexte</h3>
                <p>Projet personnel réalisé pour présenter mon parcours, mes compétences et mes projets.</p>
                <h3>Travail réalisé</h3>
                <ul>
                    <li>Design dark mode et glassmorphism dans la première version.</li>
                    <li>JavaScript vanilla pour les interactions, filtres et panneaux.</li>
                    <li>Optimisation responsive mobile et desktop.</li>
                </ul>
                <h3>Résultat</h3>
                <p>Un support de candidature complet et évolutif.</p>
            `
        },
        "project-nettoolbox": {
            title: "Net ToolBox",
            meta: "Réseaux - Diagnostic mobile",
            body: `
                <img class="panel-image zoomable" src="${images.switch}" alt="Switch réseau en fonctionnement">
                <h3>Contexte</h3>
                <p>Projet personnel né d'un intérêt pour le développement mobile et l'administration réseau.</p>
                <h3>Objectif</h3>
                <p>Centraliser plusieurs outils techniques utiles au diagnostic réseau sur smartphone.</p>
                <h3>Travail réalisé</h3>
                <ul>
                    <li>Interface XML sous Android Studio.</li>
                    <li>Calculateur de sous-réseaux.</li>
                    <li>Moniteur de signal Wi-Fi et client TCP.</li>
                </ul>
                <h3>Résultat</h3>
                <p>Application fonctionnelle pour effectuer des tests réseau rapides.</p>
            `
        },
        "project-sae23": {
            title: "SAE23 - Audit de sécurité",
            meta: "Cybersécurité & Web",
            body: `
                <img class="panel-image zoomable" src="${images.cyber}" alt="Cybersécurité et code">
                <h3>Contexte</h3>
                <p>Projet de formation portant sur l'analyse de vulnérabilités dans une application web.</p>
                <h3>Objectif</h3>
                <p>Comprendre les failles de sécurité web, notamment les injections SQL, afin d'identifier les risques et d'appliquer les bonnes pratiques.</p>
                <h3>Travail réalisé</h3>
                <p>J'ai développé une application PHP/MySQL volontairement vulnérable, exploité une injection SQL, puis appliqué une correction pour illustrer la sécurisation.</p>
                <h3>Résultat</h3>
                <p>Une application fonctionnelle accompagnée d'un rapport d'audit structuré.</p>
            `
        },
        "project-sae22": {
            title: "SAE22 - Math Lab",
            meta: "Projet en cours",
            body: `
                <img class="panel-image zoomable" src="${images.code}" alt="Interface de code et logique informatique">
                <h3>Contexte</h3>
                <p>Projet en cours dans le cadre de la formation.</p>
                <h3>Objectif</h3>
                <p>Consolider les notions mathématiques et leur application dans un contexte technique.</p>
                <h3>Travail réalisé</h3>
                <p>Le contenu détaillé sera complété au fur et à mesure de l'avancement du projet.</p>
            `
        }
    };

    function accordion(title, content) {
        return `
            <div class="accordion-item">
                <button class="accordion-header" type="button">
                    <span>${title}</span>
                    <i class="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </button>
                <div class="accordion-content">${content}</div>
            </div>
        `;
    }

    document.querySelectorAll(`[data-nav="${page}"]`).forEach((link) => {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
    });

    if (menuToggle && mobileNav) {
        menuToggle.addEventListener("click", () => {
            const isOpen = document.body.classList.toggle("nav-open");
            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.innerHTML = isOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
        });
    }

    document.querySelectorAll(".mobile-nav a").forEach((link) => {
        link.addEventListener("click", () => {
            document.body.classList.remove("nav-open");
            if (menuToggle) {
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
            }
        });
    });

    const revealItems = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("in-view");
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });
        revealItems.forEach((item) => revealObserver.observe(item));
    } else {
        revealItems.forEach((item) => item.classList.add("in-view"));
    }

    const filterBtns = document.querySelectorAll(".btn-filter");
    const techSkills = document.getElementById("tech-skills");
    const humanSkills = document.getElementById("human-skills");

    filterBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            filterBtns.forEach((item) => item.classList.remove("active"));
            btn.classList.add("active");

            const filter = btn.dataset.filter;
            if (!techSkills || !humanSkills) return;

            const showTech = filter === "tech";
            techSkills.classList.toggle("hidden", !showTech);
            humanSkills.classList.toggle("hidden", showTech);

            const visibleGrid = showTech ? techSkills : humanSkills;
            visibleGrid.querySelectorAll(".reveal").forEach((item) => item.classList.add("in-view"));
        });
    });

    function openPanel(id) {
        if (!sidePanel || !overlay || !panelTitle || !panelMeta || !panelLocation || !panelBody) return;
        const data = detailData[id];
        if (!data) return;

        panelTitle.textContent = data.title;
        panelMeta.textContent = data.meta || "";
        panelLocation.textContent = data.location || "";
        panelLocation.style.display = data.location ? "block" : "none";
        panelBody.innerHTML = data.body || "";

        sidePanel.classList.add("active");
        sidePanel.setAttribute("aria-hidden", "false");
        overlay.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function closePanel() {
        if (!sidePanel || !overlay) return;
        sidePanel.classList.remove("active");
        sidePanel.setAttribute("aria-hidden", "true");
        overlay.classList.remove("active");
        document.body.style.overflow = "";
    }

    document.querySelectorAll(".detail-trigger").forEach((trigger) => {
        trigger.addEventListener("click", () => openPanel(trigger.dataset.detail));
        trigger.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openPanel(trigger.dataset.detail);
            }
        });
    });

    if (closeBtn) closeBtn.addEventListener("click", closePanel);
    if (overlay) overlay.addEventListener("click", closePanel);

    if (panelBody) {
        panelBody.addEventListener("click", (event) => {
            const header = event.target.closest(".accordion-header");
            if (!header) return;

            const content = header.nextElementSibling;
            const isActive = header.classList.toggle("active");
            if (content) content.classList.toggle("active", isActive);
        });
    }

    const lightbox = document.createElement("div");
    lightbox.className = "lightbox";
    lightbox.setAttribute("role", "dialog");
    lightbox.setAttribute("aria-label", "Image agrandie");
    lightbox.innerHTML = '<img alt="">';
    document.body.appendChild(lightbox);
    const lightboxImg = lightbox.querySelector("img");

    function closeLightbox() {
        lightbox.classList.remove("active");
        if (lightboxImg) {
            lightboxImg.removeAttribute("src");
            lightboxImg.alt = "";
        }
    }

    document.addEventListener("click", (event) => {
        const target = event.target;
        if (!(target instanceof HTMLImageElement)) return;
        if (!target.matches("[data-lightbox], .zoomable")) return;

        if (lightboxImg) {
            lightboxImg.src = target.src;
            lightboxImg.alt = target.alt || "Image agrandie";
        }
        lightbox.classList.add("active");
    });

    lightbox.addEventListener("click", closeLightbox);
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeLightbox();
            closePanel();
        }
    });
});
