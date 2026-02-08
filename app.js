/* =========================================
   APP LOGIC - Mariélio Fernandes Portfolio
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Menu ---
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navUl = document.querySelector('nav ul');

    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            navUl.classList.toggle('active');
            menuBtn.innerHTML = navUl.classList.contains('active') ? '✕' : '☰';
        });

        // Close menu when clicking a link
        navUl.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navUl.classList.remove('active');
                menuBtn.innerHTML = '☰';
            });
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 1024 && navUl.classList.contains('active')) {
                navUl.classList.remove('active');
                menuBtn.innerHTML = '☰';
            }
        });
    }

    // --- Scroll Animations ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // --- Language / i18n ---
    const LANGUAGE_STORAGE_KEY = 'site_language';
    const languageToggleBtn = document.getElementById('lang-toggle');
    let currentLanguage = 'pt';

    const uiTranslations = {
        pt: {
            langButton: 'EN',
            title: 'Mariélio. Data Scientist & Systems',
            metaDescription: 'Mariélio Fernandes - Data Scientist focado em Software, Data Science e IA aplicada a negócios.',
            nav: ['Quem sou', 'Serviços', 'Como Trabalho', 'Portfólio', 'Estimativa'],
            hero: {
                title: 'Dados e IA aplicados para<br><span class="text-gradient">transformar operação em decisão.</span>',
                subtitle: 'Desenvolvo softwares e ecossistemas inteligentes que se integram aos seus processos,<br>garantindo estabilidade, segurança e escalabilidade operacional.',
                primaryCta: 'Chamar no WhatsApp',
                secondaryCta: 'Fazer estimativa do projeto',
                badges: ['Data Science', 'IA Aplicada', 'Cloud-ready', 'Automação', 'Escalável', 'Seguro'],
                segments: ['Empreiteiras', 'Indústrias', 'Agronegócio', 'Comércio<br>e Varejo']
            },
            about: {
                heading: 'Quem sou',
                lead: 'Sou Mariélio Fernandes, Cientista de Dados:',
                body: 'Construo soluções orientadas a dados e IA para reduzir ineficiência, padronizar rotinas e melhorar a tomada de decisão em operações reais.',
                cta: 'Ver portfólio',
                detailTitles: ['Segmentos atendidos', 'Foco de resultado', 'Stack de trabalho', 'Padrão de entrega'],
                detailBodies: [
                    'Empreiteiras, indústrias, agronegócio e varejo.',
                    'Eficiência operacional, previsibilidade e indicadores acionáveis.',
                    'Python, Flask, SQL, automação, IA aplicada e dashboards.',
                    'Arquitetura sólida, documentação e evolução contínua pós-deploy.'
                ],
                featureTitles: ['Automação & Data Apps', 'ETL/ELT e Integrações', 'Modelos Preditivos', 'LLMs e Chatbots']
            },
            services: {
                heading: 'Serviços',
                cards: [
                    {
                        title: 'Desenvolvimento de Software',
                        items: ['Web Apps e SaaS', 'Aplicativos Internos', 'Dashboards orientados a dados'],
                        cta: 'Quero conversar'
                    },
                    {
                        title: 'Data Science',
                        items: ['Modelos Preditivos', 'Otimização de Processos', 'Visão Computacional'],
                        cta: 'Quero conversar'
                    },
                    {
                        title: 'Inteligência Artificial',
                        items: ['LLMs e Chatbots', 'Agentes Autônomos', 'Automação Inteligente'],
                        cta: 'Quero conversar'
                    },
                    {
                        title: 'Integrações e Dados',
                        items: ['Pipelines ETL/ELT', 'APIs REST/GraphQL', 'Bancos de Dados e Big Data'],
                        cta: 'Quero conversar'
                    }
                ],
                extras: 'Também ofereço: <strong style="color: #fff;">Consultoria Estratégica</strong> e <strong style="color: #fff;">Treinamento de Equipes</strong>.'
            },
            process: {
                heading: 'Como Trabalho',
                steps: ['Descoberta', 'Arquitetura', 'Construção', 'Deploy', 'Monitoramento'],
                note: 'Reforçando: versionamento, logs, observabilidade, backups, controle de acesso e LGPD.'
            },
            models: {
                heading: 'Modelos de Atuação',
                cards: [
                    {
                        title: 'Consultoria & Treinamento',
                        items: ['Diagnóstico técnico', 'Roadmap e arquitetura', 'Mentoria e formação do time'],
                        cta: 'Quero um diagnóstico'
                    },
                    {
                        title: 'Projeto Dedicado',
                        items: ['Construção e implantação', 'Integrações e dados', 'Evolução e suporte'],
                        cta: 'Quero tirar do papel'
                    },
                    {
                        title: 'Comprar uma Licença de Software',
                        items: ['Utilizar uma licença', 'Implementar um SaaS', 'Mudar o tipo de licença'],
                        cta: 'Quero falar sobre licença'
                    }
                ]
            },
            portfolio: {
                heading: 'Portfólio / Cases',
                viewDetails: 'Ver Detalhes'
            },
            quiz: {
                heading: 'Faça uma estimativa do seu projeto',
                subtitle: 'Responda algumas perguntas e receba uma análise preliminar de complexidade e prazo.',
                steps: [
                    { title: '1. Qual o tipo de solução?', options: ['SaaS (Software como Serviço)', 'App Interno de Gestão', 'Dashboard + Dados', 'Automação', 'IA / Agentes Inteligentes'], nav: ['Próximo →'] },
                    { title: '2. Qual o seu segmento?', options: ['Empreiteira', 'Indústria', 'Agro', 'Comércio/Varejo', 'Outro'], nav: ['← Voltar', 'Próximo →'] },
                    { title: '3. Quantos usuários utilizarão?', options: ['1 - 5 usuários', '6 - 20 usuários', '21 - 100 usuários', '100+ usuários'], nav: ['← Voltar', 'Próximo →'] },
                    { title: '4. Necessidade de integrações (APIs/Sistemas)?', options: ['Nenhuma', '1 - 2 integrações', '3 - 5 integrações', '6+ integrações complexas'], nav: ['← Voltar', 'Próximo →'] },
                    { title: '5. Como estão os dados hoje?', options: ['Planilhas variadas', 'Já existe banco de dados', 'Precisa estruturar do zero'], nav: ['← Voltar', 'Próximo →'] },
                    { title: '6. Precisa de Inteligência Artificial?', options: ['Não, apenas software convencional', 'Sim, Recomendações', 'Sim, Agentes LLM (Chatbots)', 'Sim, Visão Computacional'], nav: ['← Voltar', 'Próximo →'] },
                    { title: '7. Qual a expectativa de prazo?', options: ['Até 30 dias', '60 - 90 dias', '3 - 6 meses', '6 meses +'], nav: ['← Voltar', 'Próximo →'] },
                    { title: '8. Maturidade da ideia?', options: ['Apenas uma ideia', 'Tenho rascunho/desenho', 'Totalmente especificado', 'Já existe, precisa evoluir'], nav: ['← Voltar', 'Ver Resultado'] }
                ],
                result: {
                    heading: 'Análise do Projeto',
                    flags: ['Baixa Complexidade', 'Média Complexidade', 'Alta Complexidade'],
                    timeLabel: 'Prazo Estimado',
                    techLabel: 'Tech Stack:',
                    teamLabel: 'Equipe:',
                    deliveryLabel: 'Etapas da Entrega:',
                    note: '*Isso é uma estimativa de mercado. Comigo, você tem <strong>consultoria direta</strong> e <strong>garantia de entrega</strong>.',
                    cta: 'SOLICITAR PROPOSTA NO WHATSAPP',
                    ctaNote: 'Você enviará o resumo acima para iniciar a conversa.'
                }
            },
            authority: {
                heading: 'Conteúdo e Projetos Públicos',
                subtitle: 'Publico projetos, estudos e aplicações práticas.'
            },
            contact: {
                heading: 'Receba um Diagnóstico',
                placeholders: {
                    name: 'Seu Nome',
                    email: 'Seu E-mail Corporativo',
                    whatsapp: 'WhatsApp',
                    company: 'Empresa / Área',
                    message: 'Conte brevemente sobre o seu desafio...'
                },
                cta: 'Solicitar Diagnóstico'
            },
            finalCta: {
                heading: 'Vamos tirar seu projeto do papel?',
                cta: 'Chamar no WhatsApp'
            },
            footer: {
                copyright: '© 2026 MF Data Scientist & Systems. Todos os direitos reservados.'
            }
        },
        en: {
            langButton: 'PT-BR',
            title: 'Mariélio. Data Scientist & Systems',
            metaDescription: 'Mariélio Fernandes - Data Scientist focused on software, data science, and AI applied to business.',
            nav: ['About', 'Services', 'How I Work', 'Portfolio', 'Estimate'],
            hero: {
                title: 'Data and AI applied to<br><span class="text-gradient">turn operations into decisions.</span>',
                subtitle: 'I develop software and intelligent ecosystems that integrate with your processes,<br>ensuring operational stability, security, and scalability.',
                primaryCta: 'Message on WhatsApp',
                secondaryCta: 'Estimate your project',
                badges: ['Data Science', 'Applied AI', 'Cloud-ready', 'Automation', 'Scalable', 'Secure'],
                segments: ['Contractors', 'Industries', 'Agribusiness', 'Commerce<br>and Retail']
            },
            about: {
                heading: 'About',
                lead: 'I am Mariélio Fernandes, Data Scientist:',
                body: 'I build data-driven and AI-powered solutions to reduce inefficiency, standardize routines, and improve decision-making in real operations.',
                cta: 'View portfolio',
                detailTitles: ['Industries served', 'Outcome focus', 'Working stack', 'Delivery standard'],
                detailBodies: [
                    'Contractors, industries, agribusiness, and retail.',
                    'Operational efficiency, predictability, and actionable indicators.',
                    'Python, Flask, SQL, automation, applied AI, and dashboards.',
                    'Solid architecture, documentation, and continuous post-deployment evolution.'
                ],
                featureTitles: ['Automation & Data Apps', 'ETL/ELT and Integrations', 'Predictive Models', 'LLMs and Chatbots']
            },
            services: {
                heading: 'Services',
                cards: [
                    {
                        title: 'Software Development',
                        items: ['Web Apps and SaaS', 'Internal Applications', 'Data-driven dashboards'],
                        cta: 'Let\'s talk'
                    },
                    {
                        title: 'Data Science',
                        items: ['Predictive Models', 'Process Optimization', 'Computer Vision'],
                        cta: 'Let\'s talk'
                    },
                    {
                        title: 'Artificial Intelligence',
                        items: ['LLMs and Chatbots', 'Autonomous Agents', 'Intelligent Automation'],
                        cta: 'Let\'s talk'
                    },
                    {
                        title: 'Integrations and Data',
                        items: ['ETL/ELT Pipelines', 'REST/GraphQL APIs', 'Databases and Big Data'],
                        cta: 'Let\'s talk'
                    }
                ],
                extras: 'I also offer: <strong style="color: #fff;">Strategic Consulting</strong> and <strong style="color: #fff;">Team Training</strong>.'
            },
            process: {
                heading: 'How I Work',
                steps: ['Discovery', 'Architecture', 'Build', 'Deployment', 'Monitoring'],
                note: 'Always included: versioning, logs, observability, backups, access control, and privacy compliance.'
            },
            models: {
                heading: 'Engagement Models',
                cards: [
                    {
                        title: 'Consulting & Training',
                        items: ['Technical diagnosis', 'Roadmap and architecture', 'Mentoring and team enablement'],
                        cta: 'I want a diagnosis'
                    },
                    {
                        title: 'Dedicated Project',
                        items: ['Build and deployment', 'Integrations and data', 'Continuous evolution and support'],
                        cta: 'I want to build it'
                    },
                    {
                        title: 'Buy a Software License',
                        items: ['Use an existing license', 'Implement a SaaS', 'Change the license model'],
                        cta: 'I want to discuss licensing'
                    }
                ]
            },
            portfolio: {
                heading: 'Portfolio / Cases',
                viewDetails: 'View Details'
            },
            quiz: {
                heading: 'Get a project estimate',
                subtitle: 'Answer a few questions and receive a preliminary analysis of complexity and timeline.',
                steps: [
                    { title: '1. What type of solution?', options: ['SaaS (Software as a Service)', 'Internal Management App', 'Dashboard + Data', 'Automation', 'AI / Intelligent Agents'], nav: ['Next →'] },
                    { title: '2. What is your industry?', options: ['Contractor', 'Industry', 'Agribusiness', 'Commerce/Retail', 'Other'], nav: ['← Back', 'Next →'] },
                    { title: '3. How many users?', options: ['1 - 5 users', '6 - 20 users', '21 - 100 users', '100+ users'], nav: ['← Back', 'Next →'] },
                    { title: '4. Integration needs (APIs/Systems)?', options: ['None', '1 - 2 integrations', '3 - 5 integrations', '6+ complex integrations'], nav: ['← Back', 'Next →'] },
                    { title: '5. What is your current data status?', options: ['Mixed spreadsheets', 'Database already exists', 'Need to structure from scratch'], nav: ['← Back', 'Next →'] },
                    { title: '6. Do you need Artificial Intelligence?', options: ['No, only conventional software', 'Yes, Recommendations', 'Yes, LLM Agents (Chatbots)', 'Yes, Computer Vision'], nav: ['← Back', 'Next →'] },
                    { title: '7. Expected timeline?', options: ['Up to 30 days', '60 - 90 days', '3 - 6 months', '6+ months'], nav: ['← Back', 'Next →'] },
                    { title: '8. Idea maturity?', options: ['Just an idea', 'I have drafts/sketches', 'Fully specified', 'Already exists, needs evolution'], nav: ['← Back', 'See Result'] }
                ],
                result: {
                    heading: 'Project Analysis',
                    flags: ['Low Complexity', 'Medium Complexity', 'High Complexity'],
                    timeLabel: 'Estimated Timeline',
                    techLabel: 'Tech Stack:',
                    teamLabel: 'Team:',
                    deliveryLabel: 'Delivery Stages:',
                    note: '*This is a market estimate. With me, you get <strong>direct consulting</strong> and <strong>delivery guarantee</strong>.',
                    cta: 'REQUEST PROPOSAL ON WHATSAPP',
                    ctaNote: 'You will send the summary above to start the conversation.'
                }
            },
            authority: {
                heading: 'Content and Public Projects',
                subtitle: 'I publish projects, studies, and practical applications.'
            },
            contact: {
                heading: 'Get a Technical Diagnosis',
                placeholders: {
                    name: 'Your Name',
                    email: 'Your Business Email',
                    whatsapp: 'WhatsApp',
                    company: 'Company / Area',
                    message: 'Briefly describe your challenge...'
                },
                cta: 'Request Diagnosis'
            },
            finalCta: {
                heading: 'Ready to bring your project to life?',
                cta: 'Message on WhatsApp'
            },
            footer: {
                copyright: '© 2026 MF Data Scientist & Systems. All rights reserved.'
            }
        }
    };

    const runtimeTranslations = {
        pt: {
            selectOption: 'Por favor, selecione uma opção para continuar.',
            leadConfirm: 'Obrigado pelo interesse! Seu diagnóstico técnico começará com uma conversa rápida. Clique em OK para abrir o WhatsApp.',
            complexity: { low: 'Baixa', medium: 'Média', high: 'Alta' },
            stackTerms: {
                iotEdge: 'IoT / Edge (se necessário)',
                dbOptimization: 'Otimização de Banco',
                dataModeling: 'Modelagem de Dados',
                dataCleaning: 'Pipeline de Limpeza'
            },
            types: {
                saas: { title: 'Plataforma SaaS B2B', description: 'Software como Serviço focado em escalabilidade, multi-tenancy e pagamentos.' },
                internal: { title: 'Sistema de Gestão Interno', description: 'Aplicação corporativa para otimização de processos e controle de dados.' },
                dashboard: { title: 'Dashboard & Data Analytics', description: 'Central de inteligência para visualização de indicadores e tomada de decisão.' },
                automation: { title: 'Automação de Processos (RPA/Workflow)', description: 'Robôs de software para eliminar tarefas repetitivas e integrar sistemas.' },
                ai_agent: { title: 'Agentes de IA & LLMs', description: 'Solução avançada de IA Generativa para atendimento ou análise.' },
                custom: { title: 'Projeto Sob Medida', description: 'Solução personalizada conforme as prioridades e restrições do negócio.' }
            },
            processList: [
                { icon: 'ph-code', text: '<strong>Desenvolvimento Ágil:</strong> Sprints semanais com entregas visíveis.' },
                { icon: 'ph-test-tube', text: '<strong>Testes & QA:</strong> Garantia de funcionamento livre de bugs.' },
                { icon: 'ph-hard-drives', text: '<strong>Infra Dedicada:</strong> Servidor exclusivo e seguro.' },
                { icon: 'ph-users-three', text: '<strong>Treinamento:</strong> Capacitação da equipe e suporte contínuo.' }
            ]
        },
        en: {
            selectOption: 'Please select an option to continue.',
            leadConfirm: 'Thanks for your interest! Your technical diagnosis starts with a quick conversation. Click OK to open WhatsApp.',
            complexity: { low: 'Low', medium: 'Medium', high: 'High' },
            stackTerms: {
                iotEdge: 'IoT / Edge (if needed)',
                dbOptimization: 'Database Optimization',
                dataModeling: 'Data Modeling',
                dataCleaning: 'Data Cleaning Pipeline'
            },
            types: {
                saas: { title: 'B2B SaaS Platform', description: 'Software-as-a-Service focused on scalability, multi-tenancy, and billing.' },
                internal: { title: 'Internal Management System', description: 'Corporate application to optimize processes and control data.' },
                dashboard: { title: 'Dashboard & Data Analytics', description: 'Intelligence hub for KPI visualization and decision-making.' },
                automation: { title: 'Process Automation (RPA/Workflow)', description: 'Software bots to remove repetitive tasks and integrate systems.' },
                ai_agent: { title: 'AI Agents & LLMs', description: 'Advanced generative AI solution for support or analysis.' },
                custom: { title: 'Custom Project', description: 'Tailored solution based on your business priorities and constraints.' }
            },
            processList: [
                { icon: 'ph-code', text: '<strong>Agile Development:</strong> Weekly sprints with visible deliveries.' },
                { icon: 'ph-test-tube', text: '<strong>Testing & QA:</strong> Reliability and bug-free operation.' },
                { icon: 'ph-hard-drives', text: '<strong>Dedicated Infrastructure:</strong> Secure and exclusive server setup.' },
                { icon: 'ph-users-three', text: '<strong>Training:</strong> Team enablement and continuous support.' }
            ]
        }
    };

    const detectDefaultLanguage = () => {
        const browserLanguages = Array.isArray(navigator.languages) && navigator.languages.length > 0
            ? navigator.languages
            : [navigator.language || ''];

        const isBrazil = browserLanguages.some((lang) => /(^|-)pt-br$/i.test(lang) || /-br$/i.test(lang));
        return isBrazil ? 'pt' : 'en';
    };

    const setText = (selector, value) => {
        const el = document.querySelector(selector);
        if (el && typeof value === 'string') el.textContent = value;
    };

    const setHtml = (selector, value) => {
        const el = document.querySelector(selector);
        if (el && typeof value === 'string') el.innerHTML = value;
    };

    const preserveIconAndSetText = (element, text) => {
        if (!element) return;
        const icon = element.querySelector('i');
        if (!icon) {
            element.textContent = text;
            return;
        }
        element.innerHTML = '';
        element.appendChild(icon);
        element.append(document.createTextNode(` ${text}`));
    };

    const applyStaticLanguage = (lang) => {
        const content = uiTranslations[lang] || uiTranslations.pt;

        document.documentElement.lang = lang === 'en' ? 'en' : 'pt-BR';
        document.title = content.title;

        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) metaDescription.setAttribute('content', content.metaDescription);

        if (languageToggleBtn) {
            languageToggleBtn.textContent = content.langButton;
            languageToggleBtn.setAttribute('aria-label', lang === 'pt' ? 'Switch language' : 'Alternar idioma');
        }

        document.querySelectorAll('.logo-sub').forEach((el) => {
            el.innerHTML = 'Data Scientist<br>&amp; Systems';
        });

        const navLinks = document.querySelectorAll('nav ul li a');
        content.nav.forEach((label, index) => {
            if (navLinks[index]) navLinks[index].textContent = label;
        });

        setHtml('.hero-title', content.hero.title);
        setHtml('.hero-subtitle', content.hero.subtitle);
        setText('.hero .btn-primary.btn-lg', content.hero.primaryCta);
        setText('.hero .btn-outline.btn-lg', content.hero.secondaryCta);

        const badgeElements = document.querySelectorAll('.hero-badges .badge');
        content.hero.badges.forEach((label, index) => {
            preserveIconAndSetText(badgeElements[index], label);
        });

        const segmentElements = document.querySelectorAll('.segments-grid .segment-item');
        content.hero.segments.forEach((label, index) => {
            const el = segmentElements[index];
            if (!el) return;
            const icon = el.querySelector('i');
            if (icon) {
                el.innerHTML = `${icon.outerHTML}${label}`;
            } else {
                el.innerHTML = label;
            }
        });

        setText('#about h2', content.about.heading);
        setText('#about .about-lead', content.about.lead);
        setText('#about .about-text > p:not(.about-lead)', content.about.body);
        setText('#about .about-cta', content.about.cta);

        const aboutDetailCards = document.querySelectorAll('#about .about-detail-card');
        aboutDetailCards.forEach((card, index) => {
            setText(`#about .about-detail-card:nth-child(${index + 1}) h5`, content.about.detailTitles[index]);
            setText(`#about .about-detail-card:nth-child(${index + 1}) p`, content.about.detailBodies[index]);
        });

        const featureTitles = document.querySelectorAll('#about .feature-card h4');
        content.about.featureTitles.forEach((title, index) => {
            if (featureTitles[index]) featureTitles[index].textContent = title;
        });

        setText('#services h2', content.services.heading);
        const serviceCards = document.querySelectorAll('#services .services-grid .card');
        serviceCards.forEach((card, index) => {
            const cardData = content.services.cards[index];
            if (!cardData) return;

            const titleEl = card.querySelector('h3');
            if (titleEl) titleEl.textContent = cardData.title;

            const listItems = card.querySelectorAll('li');
            cardData.items.forEach((item, itemIndex) => {
                preserveIconAndSetText(listItems[itemIndex], item);
            });

            const cta = card.querySelector('a');
            if (cta) cta.textContent = cardData.cta;
        });
        setHtml('#services .extras p', content.services.extras);

        setText('#process h2', content.process.heading);
        const processSteps = document.querySelectorAll('#process .step h4');
        content.process.steps.forEach((step, index) => {
            if (processSteps[index]) processSteps[index].textContent = step;
        });
        setText('#process .container > p', content.process.note);

        setText('#models h2', content.models.heading);
        const modelCards = document.querySelectorAll('#models .services-grid .card');
        modelCards.forEach((card, index) => {
            const cardData = content.models.cards[index];
            if (!cardData) return;

            const titleEl = card.querySelector('h3');
            if (titleEl) titleEl.textContent = cardData.title;

            const listItems = card.querySelectorAll('li');
            cardData.items.forEach((item, itemIndex) => {
                preserveIconAndSetText(listItems[itemIndex], item);
            });

            const cta = card.querySelector('a');
            if (cta) cta.textContent = cardData.cta;
        });

        setText('#portfolio h2', content.portfolio.heading);

        setText('#quiz-section .container > h2', content.quiz.heading);
        setText('#quiz-section .container > p', content.quiz.subtitle);

        const quizSteps = document.querySelectorAll('#quiz-section .quiz-step[data-step]');
        quizSteps.forEach((stepEl, index) => {
            const stepData = content.quiz.steps[index];
            if (!stepData) return;

            const titleEl = stepEl.querySelector('h3');
            if (titleEl) titleEl.textContent = stepData.title;

            const optionButtons = stepEl.querySelectorAll('.option-btn');
            stepData.options.forEach((option, optionIndex) => {
                if (optionButtons[optionIndex]) optionButtons[optionIndex].textContent = option;
            });

            const navButtons = stepEl.querySelectorAll('.quiz-nav button');
            stepData.nav.forEach((label, navIndex) => {
                if (navButtons[navIndex]) navButtons[navIndex].textContent = label;
            });
        });

        setText('#quiz-result > h3', content.quiz.result.heading);
        setText('#flag-low', content.quiz.result.flags[0]);
        setText('#flag-med', content.quiz.result.flags[1]);
        setText('#flag-high', content.quiz.result.flags[2]);
        setText('#quiz-result .market-price h4', content.quiz.result.timeLabel);
        setText('#quiz-result .result-item:nth-of-type(1) strong', content.quiz.result.techLabel);
        setText('#quiz-result .result-item:nth-of-type(2) strong', content.quiz.result.teamLabel);
        setText('#quiz-result .result-card > div[style*="margin: 25px 0"] h4', content.quiz.result.deliveryLabel);
        setHtml('#quiz-result > p', content.quiz.result.note);
        const summaryBtn = document.getElementById('btn-send-whatsapp');
        if (summaryBtn) summaryBtn.innerHTML = `${content.quiz.result.cta} <i class="ph ph-whatsapp-logo" style="margin-left:8px; vertical-align:middle;"></i>`;
        setText('#quiz-result .text-center p', content.quiz.result.ctaNote);

        setText('section.section-padding[style*="background: var(--surface-color);"] .container.text-center h2', content.authority.heading);
        setText('section.section-padding[style*="background: var(--surface-color);"] .container.text-center > p', content.authority.subtitle);

        setText('#contact h2', content.contact.heading);
        const nameInput = document.querySelector('#lead-form input[name="name"]');
        const emailInput = document.querySelector('#lead-form input[name="email"]');
        const whatsappInput = document.querySelector('#lead-form input[name="whatsapp"]');
        const companyInput = document.querySelector('#lead-form input[name="company"]');
        const messageInput = document.querySelector('#lead-form textarea[name="message"]');
        if (nameInput) nameInput.placeholder = content.contact.placeholders.name;
        if (emailInput) emailInput.placeholder = content.contact.placeholders.email;
        if (whatsappInput) whatsappInput.placeholder = content.contact.placeholders.whatsapp;
        if (companyInput) companyInput.placeholder = content.contact.placeholders.company;
        if (messageInput) messageInput.placeholder = content.contact.placeholders.message;
        setText('#lead-form button[type="submit"]', content.contact.cta);

        setText('.final-cta h2', content.finalCta.heading);
        setText('.final-cta a.btn', content.finalCta.cta);
        setText('footer .container > p', content.footer.copyright);
    };

    // --- Portfolio Slider ---
    const track = document.querySelector('.slider-track');
    const nextBtn = document.getElementById('nextSlide');
    const prevBtn = document.getElementById('prevSlide');
    let portfolioIndex = 0;
    let sliderInitialized = false;

    const getVisibleSlides = () => {
        if (window.innerWidth >= 1024) return 3;
        if (window.innerWidth >= 768) return 2;
        return 1;
    };

    const updatePortfolioSlider = () => {
        if (!track) return;

        const slides = track.querySelectorAll('.slide');
        if (!slides.length) {
            track.style.transform = 'translateX(0)';
            return;
        }

        const visibleSlides = getVisibleSlides();
        const maxIndex = Math.max(0, slides.length - visibleSlides);
        portfolioIndex = Math.min(portfolioIndex, maxIndex);

        const stepPercent = 100 / visibleSlides;
        track.style.transform = `translateX(-${portfolioIndex * stepPercent}%)`;
    };

    const nextPortfolioSlide = () => {
        if (!track) return;

        const totalSlides = track.querySelectorAll('.slide').length;
        const maxIndex = Math.max(0, totalSlides - getVisibleSlides());
        portfolioIndex = portfolioIndex >= maxIndex ? 0 : portfolioIndex + 1;
        updatePortfolioSlider();
    };

    const prevPortfolioSlide = () => {
        if (!track) return;

        const totalSlides = track.querySelectorAll('.slide').length;
        const maxIndex = Math.max(0, totalSlides - getVisibleSlides());
        portfolioIndex = portfolioIndex <= 0 ? maxIndex : portfolioIndex - 1;
        updatePortfolioSlider();
    };

    const initPortfolioSlider = () => {
        if (!track || sliderInitialized) {
            updatePortfolioSlider();
            return;
        }

        if (nextBtn) nextBtn.addEventListener('click', nextPortfolioSlide);
        if (prevBtn) prevBtn.addEventListener('click', prevPortfolioSlide);
        window.addEventListener('resize', updatePortfolioSlider);

        sliderInitialized = true;
        updatePortfolioSlider();
    };

    // --- Quiz Logic ---
    const quizSection = document.getElementById('quiz-section');
    if (quizSection) {
        let currentStep = 0;
        const answers = {};
        const steps = document.querySelectorAll('.quiz-step');
        const progressFill = document.querySelector('.progress-fill');

        // Initial Progress
        updateProgress();

        // Option Selection
        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                const parent = this.parentElement;
                // Remove active class from siblings
                parent.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
                this.classList.add('selected');

                // Save Answer
                const key = parent.dataset.key; // e.g., 'type', 'segment'
                const value = this.dataset.value;
                const text = this.innerText;

                answers[key] = { value, text };

                // Auto-advance after small delay (optional, improves UX)
                // setTimeout(() => nextQuizStep(), 300); 
            });
        });

        // Navigation Functions attached to window for HTML onClick
        window.nextQuizStep = () => {
            const currentStepEl = steps[currentStep];
            const options = currentStepEl.querySelector('.quiz-options');

            // Validate selection
            if (options && !currentStepEl.querySelector('.selected')) {
                alert(runtimeTranslations[currentLanguage].selectOption);
                return;
            }

            if (currentStep < steps.length - 1) {
                steps[currentStep].classList.remove('active');
                currentStep++;
                steps[currentStep].classList.add('active');
                updateProgress();

                // If we reached the result step (last one), calculate
                if (steps[currentStep].id === 'quiz-result') {
                    showResults();
                }
            }
        };

        window.prevQuizStep = () => {
            if (currentStep > 0) {
                steps[currentStep].classList.remove('active');
                currentStep--;
                steps[currentStep].classList.add('active');
                updateProgress();
            }
        };

        function updateProgress() {
            // Steps index 0 to length-1. 
            // Result is last index.
            const total = steps.length - 1;
            const percentage = (currentStep / total) * 100;
            progressFill.style.width = `${percentage}%`;
        }

        function showResults() {
            console.log("Calculando resultados...", answers);
            const runtime = runtimeTranslations[currentLanguage] || runtimeTranslations.pt;

            // --- VARIABLES ---
            let complexityScore = 0;
            let minWeeks = 0;
            let maxWeeks = 0;
            let complexityKey = 'low';
            let team = [];
            let stack = [];
            let title = '';
            let description = '';

            // --- 1. BASE LOGIC BY TYPE ---
            const type = answers.type?.value || 'saas';
            switch (type) {
                case 'saas':
                    title = runtime.types.saas.title;
                    description = runtime.types.saas.description;
                    complexityScore += 4;
                    stack.push('React/Next.js', 'Node.js', 'PostgreSQL', 'Stripe');
                    team.push('Full-Stack Engineer', 'UI/UX Designer');
                    // Base: 2 to 3 months
                    minWeeks = 8; maxWeeks = 12;
                    break;
                case 'internal':
                    title = runtime.types.internal.title;
                    description = runtime.types.internal.description;
                    complexityScore += 3;
                    stack.push('React', 'Python/Django', 'SQL Server', 'Auth Provider');
                    team.push('Full-Stack Engineer');
                    // Base: 1.5 to 2.5 months
                    minWeeks = 6; maxWeeks = 10;
                    break;
                case 'dashboard':
                    title = runtime.types.dashboard.title;
                    description = runtime.types.dashboard.description;
                    complexityScore += 2;
                    stack.push('Streamlit/Dash', 'Python ETL', 'Data Warehouse');
                    team.push('Data Engineer', 'Data Analyst');
                    // Base: 3 to 5 weeks
                    minWeeks = 3; maxWeeks = 5;
                    break;
                case 'automation':
                    title = runtime.types.automation.title;
                    description = runtime.types.automation.description;
                    complexityScore += 3;
                    stack.push('Python Scripts', 'Airflow/n8n', 'APIs');
                    team.push('Backend Developer', 'Automation Specialist');
                    // Base: 1 to 2 months
                    minWeeks = 4; maxWeeks = 8;
                    break;
                case 'ai_agent':
                    title = runtime.types.ai_agent.title;
                    description = runtime.types.ai_agent.description;
                    complexityScore += 6;
                    stack.push('LangChain', 'OpenAI/Anthropic', 'Vector DB', 'FastAPI');
                    team.push('AI Engineer', 'Backend Developer');
                    // Base: 2.5 to 3.5 months
                    minWeeks = 10; maxWeeks = 14;
                    break;
                default:
                    title = runtime.types.custom.title;
                    description = runtime.types.custom.description;
                    minWeeks = 4; maxWeeks = 8;
                    complexityScore += 2;
            }

            // --- 2. ADJUST BY SEGMENT ---
            // Industry/Agro/Construction add complexity due to specificity
            const segment = answers.segment?.value;
            if (['industry', 'agro', 'construction'].includes(segment)) {
                complexityScore += 2;
                minWeeks += 2; maxWeeks += 2; // Context-heavy
                stack.push(runtime.stackTerms.iotEdge);
            }

            // --- 3. ADJUST BY USERS ---
            const users = answers.users?.value;
            if (users === '21-100') {
                complexityScore += 2;
                stack.push(runtime.stackTerms.dbOptimization);
            } else if (users === '100+') {
                complexityScore += 5;
                minWeeks += 3; maxWeeks += 4; // High scale
                stack.push('Redis', 'Load Balancer', 'Kubernetes');
                team.push('DevOps Engineer');
            }

            // --- 4. ADJUST BY INTEGRATIONS ---
            const integrations = answers.integrations?.value;
            if (integrations === '1-2') {
                complexityScore += 1;
                minWeeks += 1; maxWeeks += 1;
            } else if (integrations === '3-5') {
                complexityScore += 3;
                minWeeks += 2; maxWeeks += 3;
                stack.push('API Gateway');
            } else if (integrations === '6+') {
                complexityScore += 6;
                minWeeks += 4; maxWeeks += 6;
                team.push('Integration Specialist');
            }

            // --- 5. DATA STATUS ---
            const dataStatus = answers.data_status?.value;
            if (dataStatus === 'scratch') {
                complexityScore += 2;
                minWeeks += 2; maxWeeks += 2; // Modeling takes time
                stack.push(runtime.stackTerms.dataModeling);
            } else if (dataStatus === 'spreadsheets') {
                complexityScore += 1;
                minWeeks += 1; maxWeeks += 1; // Cleaning
                stack.push(runtime.stackTerms.dataCleaning);
            }

            // --- 6. AI LEVEL ---
            const aiLevel = answers.ai?.value;
            if (aiLevel === 'recs') {
                complexityScore += 3;
                minWeeks += 2; maxWeeks += 3;
                stack.push('Scikit-learn (ML)');
            } else if (aiLevel === 'agent' && type !== 'ai_agent') {
                complexityScore += 5;
                minWeeks += 3; maxWeeks += 4;
                stack.push('LangChain', 'LLM API');
            } else if (aiLevel === 'vision') {
                complexityScore += 6;
                minWeeks += 4; maxWeeks += 5;
                stack.push('Computer Vision', 'GPU Cloud');
                team.push('Computer Vision Engineer');
            }

            // Final Time String
            const leadTime = currentLanguage === 'en'
                ? `${minWeeks} - ${maxWeeks} weeks`
                : `${minWeeks} - ${maxWeeks} semanas`;

            // --- SCORE TO LABEL ---
            // New Thresholds: Low <= 8, Medium <= 14, High > 14
            if (complexityScore <= 8) {
                complexityKey = 'low';
            } else if (complexityScore <= 15) {
                complexityKey = 'medium';
            } else {
                complexityKey = 'high';
            }
            const complexityLabel = runtime.complexity[complexityKey];

            // --- RENDER RESULTS ---
            document.getElementById('res-title').innerText = title;
            document.getElementById('res-desc').innerText = description;

            // Format Price with disclaimer
            // document.getElementById('res-price').innerHTML = `${marketPrice} <span style="display:block; font-size:0.7rem; font-weight:400; color:var(--text-muted); margin-top:5px;">(Média de mercado. Negociável conforme escopo.)</span>`;

            document.getElementById('res-time').innerText = leadTime;

            // Unique items
            stack = [...new Set(stack)];
            team = [...new Set(team)];
            document.getElementById('res-tech').innerText = stack.join(', ');
            document.getElementById('res-team').innerText = team.join(', ');

            // --- FLAGS ---
            document.querySelectorAll('.flag').forEach(f => f.classList.remove('active'));
            if (complexityKey === 'low') document.getElementById('flag-low').classList.add('active');
            if (complexityKey === 'medium') document.getElementById('flag-med').classList.add('active');
            if (complexityKey === 'high') document.getElementById('flag-high').classList.add('active');

            // --- PROCESS LIST ---
            const processList = runtime.processList;

            const processUl = document.getElementById('res-process');
            processUl.innerHTML = processList.map(item => `
                <li class="process-item">
                    <i class="ph ${item.icon}"></i>
                    <span>${item.text}</span>
                </li>
            `).join('');

            // --- PREPARE WHATSAPP MESSAGE (FORMATTED) ---
            const summary = currentLanguage === 'en'
                ? `
Hello, Mariélio!
I completed the estimate on your website and would like to discuss my project.

[PRELIMINARY SUMMARY]
- Solution: ${title}
- Complexity: ${complexityLabel}
- Estimated Timeline: ${leadTime}

[TECHNICAL CONTEXT]
- Industry: ${answers.segment?.text || '-'}
- Users: ${answers.users?.text || '-'}
- Integrations: ${answers.integrations?.text || '-'}
- Data: ${answers.data_status?.text || '-'}
- AI: ${answers.ai?.text || '-'}

How can we adapt this to my reality?
                `.trim()
                : `
Olá, Mariélio!
Fiz a estimativa no site e gostaria de conversar sobre meu projeto.

[RESUMO PRELIMINAR]
- Solução: ${title}
- Complexidade: ${complexityLabel}
- Prazo Est.: ${leadTime}

[CONTEXTO TÉCNICO]
- Setor: ${answers.segment?.text || '-'}
- Usuários: ${answers.users?.text || '-'}
- Integrações: ${answers.integrations?.text || '-'}
- Dados: ${answers.data_status?.text || '-'}
- IA: ${answers.ai?.text || '-'}

Como podemos adaptar isso à minha realidade?
                `.trim();

            const btn = document.getElementById('btn-send-whatsapp');
            if (btn) {
                btn.onclick = () => {
                    const url = `https://wa.me/5538991307746?text=${encodeURIComponent(summary)}`;
                    window.open(url, '_blank');
                };
            }
        }
    }

    // --- Lead Form (Contact Section) ---
    const leadForm = document.getElementById('lead-form');
    if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(leadForm);
            const data = Object.fromEntries(formData);

            // Honeypot check
            if (data.honeypot) return;

            // Format message for WhatsApp
            const msg = currentLanguage === 'en'
                ? `
*New Contact - Personal Website*
--------------------------------
*Name:* ${data.name}
*Email:* ${data.email}
*WhatsApp:* ${data.whatsapp}
*Company:* ${data.company}
--------------------------------
*Message:*
${data.message}
                `.trim()
                : `
*Novo Contato - Site Pessoal*
--------------------------------
*Nome:* ${data.name}
*Email:* ${data.email}
*WhatsApp:* ${data.whatsapp}
*Empresa:* ${data.company}
--------------------------------
*Mensagem:*
${data.message}
                `.trim();

            // Simulate "success" and redirect to WhatsApp
            // In a real scenario, you might send this to an API first.
            if (confirm(runtimeTranslations[currentLanguage].leadConfirm)) {
                const url = `https://wa.me/5538991307746?text=${encodeURIComponent(msg)}`;
                window.open(url, '_blank');
                leadForm.reset();
            }
        });
    }
    // --- PORTFOLIO MODAL LOGIC ---
    const projectsData = {
        AgroSupply: {
            title: 'AgroSupply',
            cardTitle: 'AgroSupply',
            desc: 'Plataforma de gestão de suprimentos e logística no agronegócio.',
            cardDesc: 'Plataforma de gestão de suprimentos e logística no agronegócio.',
            techs: ['Python', 'Agente de IA', 'KPIs Supply Chain'],
            cardTechs: ['Python', 'Agente de IA', 'KPIs Supply Chain'],
            details: {
                desafio: 'Centralizar a gestão de compras e estoque de uma rede de distribuidoras agrícolas com dados descentralizados e falhas na reposição.',
                solucao: 'Plataforma em Python com agente de IA e acompanhamento de KPIs de supply chain para apoiar decisões em tempo real.',
                resultados: 'Redução de perdas por vencimento e maior agilidade no fluxo de aprovação de compras.'
            },
            images: [
                'portfólio/AgroSupply/1.png', 'portfólio/AgroSupply/2.png', 'portfólio/AgroSupply/3.png',
                'portfólio/AgroSupply/4.png', 'portfólio/AgroSupply/5.png', 'portfólio/AgroSupply/6.png',
                'portfólio/AgroSupply/7.png', 'portfólio/AgroSupply/8.png', 'https://youtu.be/loxkmRurgD4'
            ]
        },
        SmartTank: {
            title: 'SmartTank IoT',
            cardTitle: 'SmartTank',
            desc: 'MicroSaaS para gestão de combustíveis em empreiteiras e indústrias, com controle de estoque, alertas de reposição, inventários e fechamento mensal.',
            cardDesc: 'MicroSaaS para gestão de combustíveis em empreiteiras e indústrias, com controle de estoque, alertas de reposição, inventários e fechamento mensal.',
            techs: ['Python', 'Flask', 'SQL', 'SaaS', 'Gestão de Estoque'],
            cardTechs: ['Python', 'Flask', 'SQL', 'SaaS', 'Gestão de Estoque'],
            details: {
                desafio: 'Monitorar nível, temperatura e pressão de tanques industriais e do agronegócio sem depender de conferência manual.',
                solucao: 'Sensores MQTT enviam dados para AWS IoT Core e um backend em Python processa eventos e gera alertas automáticos.',
                resultados: 'Mais previsibilidade operacional com alertas em tempo real para anomalias e níveis críticos.'
            },
            images: [
                'portfólio/SmartTank/1.png', 'portfólio/SmartTank/2.png', 'portfólio/SmartTank/3.png'
            ]
        },
        Solaristech: {
            title: 'SolarisTech',
            cardTitle: 'Solaristech',
            desc: 'Plataforma para pequenos e médios produtores de usina fotovoltaica acompanharem produção (kWh/R$), perdas e clima com API e modelos preditivos.',
            cardDesc: 'Plataforma para pequenos e médios produtores de usina fotovoltaica acompanharem produção (kWh/R$), perdas e clima com API e modelos preditivos.',
            techs: ['Python', 'Flask', 'Open-Meteo', 'PostgreSQL', 'Machine Learning'],
            cardTechs: ['Python', 'Flask', 'Open-Meteo', 'PostgreSQL', 'Machine Learning'],
            details: {
                desafio: 'Consolidar dados de geração de múltiplos inversores e identificar perdas de performance com rapidez.',
                solucao: 'Sistema com monitoramento climático, gestão de produção de KWH e modelos preditivos para antecipar desvios de geração.',
                resultados: 'Mais eficiência energética com ações preventivas e maior controle operacional das usinas solares.'
            },
            images: [
                'portfólio/Solaristech/Capa Solaristech.png', 'portfólio/Solaristech/2.png',
                'portfólio/Solaristech/3.png', 'portfólio/Solaristech/4.png', 'portfólio/Solaristech/5.png',
                'portfólio/Solaristech/6.png', 'portfólio/Solaristech/7.png', 'portfólio/Solaristech/8.png'
            ]
        },
        CargoVision: {
            title: 'CargoVision AI',
            cardTitle: 'CargoVision',
            desc: 'Dashboard em Python/Flask + SQL para monitorar entregas e SLA com GeoMaps; regressão logística (classificação) e XGBoost para predição de entregas.',
            cardDesc: 'Dashboard em Python/Flask + SQL para monitorar entregas e SLA com GeoMaps; regressão logística (classificação) e XGBoost para predição de entregas.',
            techs: ['Python', 'Flask', 'SQL', 'GeoMaps', 'Regressão Logística', 'XGBoost'],
            cardTechs: ['Python', 'Flask', 'SQL', 'GeoMaps', 'Regressão Logística', 'XGBoost'],
            details: {
                desafio: 'Automatizar controles de portaria logística para reduzir filas, falhas de validação e riscos de fraude.',
                solucao: 'Plataforma com visão computacional, georreferência e plano de rotas para otimizar inspeções e deslocamentos.',
                resultados: 'Gestão orientada por KPI\'s de transporte com mais eficiência operacional e melhor tomada de decisão logística.'
            },
            images: [
                'portfólio/cargovision/capa - CargoVision.png', 'portfólio/cargovision/cargovision 2.png',
                'portfólio/cargovision/cargovision 3.png',
                'portfólio/cargovision/cargovision 5.png'
            ]
        },
        FinanceHanna: {
            title: 'Finance Hanna',
            cardTitle: 'Finance Hanna',
            desc: 'CRM para gestão de contas a pagar e a receber, com alertas de atraso, registro de pagamentos e dashboard para monitorar as rotinas do financeiro em tempo real.',
            cardDesc: 'CRM para gestão de contas a pagar e a receber, com alertas de atraso, registro de pagamentos e dashboard para monitorar as rotinas do financeiro em tempo real.',
            techs: ['Python', 'Flask', 'Dashboards', 'Operações Financeiras', 'Controle Fiscal'],
            cardTechs: ['Python', 'Flask', 'Dashboards', 'Operações Financeiras', 'Controle Fiscal'],
            details: {
                desafio: 'Dar controle financeiro completo para pequenas e médias empresas com baixa maturidade em processos.',
                solucao: 'Sistema com contas a pagar/receber, conciliação bancária por OFX, relatórios DRE e gráficos de evolução.',
                resultados: 'Rotina financeira mais organizada, decisões mais rápidas e visão clara do fluxo de caixa.'
            },
            images: [
                'portfólio/Finance Hanna/1.png', 'portfólio/Finance Hanna/2.png',
                'portfólio/Finance Hanna/3.png', 'portfólio/Finance Hanna/4.png',
                'portfólio/Finance Hanna/5.png', 'portfólio/Finance Hanna/6.png'
            ]
        },
        ControleVendas: {
            title: 'Controle de Vendas BI',
            cardTitle: 'Controle de Vendas',
            desc: 'DataApp em dashboard para acompanhar vendas de uma concessionária: visão por estado, performance por vendedor e variação de preços conforme a tabela FIPE.',
            cardDesc: 'DataApp em dashboard para acompanhar vendas de uma concessionária: visão por estado, performance por vendedor e variação de preços conforme a tabela FIPE.',
            techs: ['Python', 'Streamlit', 'Pandas', 'Plotly'],
            cardTechs: ['Python', 'Streamlit', 'Pandas', 'Plotly'],
            details: {
                desafio: 'Unificar indicadores comerciais que estavam espalhados em planilhas e fontes desconectadas.',
                solucao: 'Pipeline ETL para consolidar dados de CRM/Excel e painel estratégico com KPIs de performance e metas.',
                resultados: 'Visão única dos indicadores com acompanhamento contínuo de meta, churn, CAC e LTV.'
            },
            images: [
                'portfólio/Controle de Vendas/1.png', 'portfólio/Controle de Vendas/2.png'
            ]
        },
        ColheitaMilho: {
            title: 'Precificação de Safra (Milho)',
            cardTitle: 'Colheita de Milho',
            desc: 'Dashboard que acompanha safra de milho, produção e ganhos, reunindo indicadores e insights de alta performance para apoiar decisões e aumentar a rentabilidade nas próximas safras.',
            cardDesc: 'Dashboard que acompanha safra de milho, produção e ganhos, reunindo indicadores e insights de alta performance para apoiar decisões e aumentar a rentabilidade nas próximas safras.',
            techs: ['Python', 'Streamlit', 'Pandas', 'Plotly'],
            cardTechs: ['Python', 'Streamlit', 'Pandas', 'Plotly'],
            details: {
                desafio: 'Estimar produtividade agrícola com maior precisão para apoiar decisões de comercialização da safra.',
                solucao: 'Pipeline de dados com limpeza, feature engineering e modelos de regressão para prever sacas por hectare.',
                resultados: 'Maior previsibilidade de produção e suporte analítico para decisões de venda futura da commodity.'
            },
            images: [
                'portfólio/Colheita de Milho/1.png', 'portfólio/Colheita de Milho/2.png',
                'portfólio/Colheita de Milho/3.png', 'portfólio/Colheita de Milho/4.png'
            ]
        }
    };

    const projectBaseTexts = JSON.parse(JSON.stringify(projectsData));
    const projectTranslationsEn = {
        AgroSupply: {
            title: 'AgroSupply',
            cardTitle: 'AgroSupply',
            desc: 'Supply and logistics management platform for agribusiness.',
            cardDesc: 'Supply and logistics management platform for agribusiness.',
            techs: ['Python', 'AI Agent', 'Supply Chain KPIs'],
            cardTechs: ['Python', 'AI Agent', 'Supply Chain KPIs'],
            details: {
                desafio: 'Centralize purchasing and inventory management for a distributor network with fragmented data and replenishment failures.',
                solucao: 'Python platform with an AI agent and real-time supply chain KPI monitoring to support decision-making.',
                resultados: 'Reduced expiration losses and improved approval speed in procurement workflows.'
            }
        },
        SmartTank: {
            title: 'SmartTank IoT',
            cardTitle: 'SmartTank',
            desc: 'MicroSaaS for fuel management in contractors and industries, with stock control, refill alerts, inventories, and monthly closing.',
            cardDesc: 'MicroSaaS for fuel management in contractors and industries, with stock control, refill alerts, inventories, and monthly closing.',
            techs: ['Python', 'Flask', 'SQL', 'SaaS', 'Inventory Management'],
            cardTechs: ['Python', 'Flask', 'SQL', 'SaaS', 'Inventory Management'],
            details: {
                desafio: 'Monitor tank levels, temperature, and pressure in industrial and agribusiness environments without manual checks.',
                solucao: 'MQTT sensors stream data to AWS IoT Core while a Python backend processes events and triggers automatic alerts.',
                resultados: 'Greater operational predictability with real-time alerts for anomalies and critical levels.'
            }
        },
        Solaristech: {
            title: 'SolarisTech',
            cardTitle: 'Solaristech',
            desc: 'Platform for small and medium photovoltaic producers to track output (kWh/$), losses, and climate using APIs and predictive models.',
            cardDesc: 'Platform for small and medium photovoltaic producers to track output (kWh/$), losses, and climate using APIs and predictive models.',
            techs: ['Python', 'Flask', 'Open-Meteo', 'PostgreSQL', 'Machine Learning'],
            cardTechs: ['Python', 'Flask', 'Open-Meteo', 'PostgreSQL', 'Machine Learning'],
            details: {
                desafio: 'Consolidate multi-inverter generation data and quickly identify performance losses.',
                solucao: 'System with climate monitoring, kWh production management, and predictive models to anticipate generation deviations.',
                resultados: 'Higher energy efficiency through preventive actions and stronger operational control.'
            }
        },
        CargoVision: {
            title: 'CargoVision AI',
            cardTitle: 'CargoVision',
            desc: 'Python/Flask + SQL dashboard to monitor deliveries and SLA with GeoMaps; logistic regression and XGBoost for delivery prediction.',
            cardDesc: 'Python/Flask + SQL dashboard to monitor deliveries and SLA with GeoMaps; logistic regression and XGBoost for delivery prediction.',
            techs: ['Python', 'Flask', 'SQL', 'GeoMaps', 'Logistic Regression', 'XGBoost'],
            cardTechs: ['Python', 'Flask', 'SQL', 'GeoMaps', 'Logistic Regression', 'XGBoost'],
            details: {
                desafio: 'Automate logistics gate control to reduce queues, validation failures, and fraud risk.',
                solucao: 'Computer vision pipeline with georeferencing and route planning to optimize inspection and movement flow.',
                resultados: 'Transport management driven by KPI monitoring, with more efficiency and better decision-making.'
            }
        },
        FinanceHanna: {
            title: 'Finance Hanna',
            cardTitle: 'Finance Hanna',
            desc: 'CRM for accounts payable and receivable management, with delay alerts, payment records, and real-time financial dashboards.',
            cardDesc: 'CRM for accounts payable and receivable management, with delay alerts, payment records, and real-time financial dashboards.',
            techs: ['Python', 'Flask', 'Dashboards', 'Financial Operations', 'Fiscal Control'],
            cardTechs: ['Python', 'Flask', 'Dashboards', 'Financial Operations', 'Fiscal Control'],
            details: {
                desafio: 'Give small and medium businesses full financial control despite low process maturity.',
                solucao: 'System for payables/receivables, OFX bank reconciliation, DRE reports, and expense trend charts.',
                resultados: 'More organized financial routine, faster decisions, and better cash-flow visibility.'
            }
        },
        ControleVendas: {
            title: 'Sales Control BI',
            cardTitle: 'Sales Control',
            desc: 'Data app dashboard for dealership sales tracking: state view, seller performance, and price variation based on FIPE table.',
            cardDesc: 'Data app dashboard for dealership sales tracking: state view, seller performance, and price variation based on FIPE table.',
            techs: ['Python', 'Streamlit', 'Pandas', 'Plotly'],
            cardTechs: ['Python', 'Streamlit', 'Pandas', 'Plotly'],
            details: {
                desafio: 'Unify sales indicators spread across disconnected spreadsheets and systems.',
                solucao: 'ETL pipeline consolidating CRM/Excel data into a strategic KPI dashboard.',
                resultados: 'Single source of truth for metrics with ongoing tracking of targets, churn, CAC, and LTV.'
            }
        },
        ColheitaMilho: {
            title: 'Corn Harvest Pricing',
            cardTitle: 'Corn Harvest',
            desc: 'Dashboard tracking corn harvest, production, and gains with high-performance indicators and insights for better profitability.',
            cardDesc: 'Dashboard tracking corn harvest, production, and gains with high-performance indicators and insights for better profitability.',
            techs: ['Python', 'Streamlit', 'Pandas', 'Plotly'],
            cardTechs: ['Python', 'Streamlit', 'Pandas', 'Plotly'],
            details: {
                desafio: 'Estimate agricultural productivity with higher precision to support crop commercialization decisions.',
                solucao: 'Data pipeline with cleaning, feature engineering, and regression models to predict yield per hectare.',
                resultados: 'Better production predictability and analytical support for future commodity sales decisions.'
            }
        }
    };

    const applyProjectLanguage = (lang) => {
        const source = lang === 'en' ? projectTranslationsEn : projectBaseTexts;

        Object.keys(projectsData).forEach((id) => {
            const localized = source[id];
            if (!localized) return;

            projectsData[id].title = localized.title;
            projectsData[id].cardTitle = localized.cardTitle;
            projectsData[id].desc = localized.desc;
            projectsData[id].cardDesc = localized.cardDesc;
            projectsData[id].techs = [...localized.techs];
            projectsData[id].cardTechs = [...localized.cardTechs];
            projectsData[id].details = { ...localized.details };
        });
    };

    const portfolioOrder = [
        'AgroSupply',
        'SmartTank',
        'Solaristech',
        'CargoVision',
        'FinanceHanna',
        'ControleVendas',
        'ColheitaMilho'
    ];

    const escapeHtml = (value = '') =>
        value
            .replaceAll('&', '&amp;')
            .replaceAll('<', '&lt;')
            .replaceAll('>', '&gt;')
            .replaceAll('"', '&quot;')
            .replaceAll("'", '&#39;');

    const renderProjectDetails = (details = {}) => {
        const desafio = escapeHtml(details.desafio || '-');
        const solucao = escapeHtml(details.solucao || '-');
        const resultados = escapeHtml(details.resultados || '-');
        const labels = currentLanguage === 'en'
            ? { desafio: 'Challenge', solucao: 'Solution', resultados: 'Results' }
            : { desafio: 'Desafio', solucao: 'Solução', resultados: 'Resultados' };

        return `
            <p><strong>${labels.desafio}:</strong> ${desafio}</p>
            <p><strong>${labels.solucao}:</strong> ${solucao}</p>
            <p><strong>${labels.resultados}:</strong> ${resultados}</p>
        `;
    };

    const renderPortfolioCards = () => {
        if (!track) return;

        track.innerHTML = portfolioOrder.map((id) => {
            const data = projectsData[id];
            if (!data) return '';

            const cover = data.images?.[0] || 'Imagens/placeholder.png';
            const title = escapeHtml(data.cardTitle || data.title || id);
            const desc = escapeHtml(data.cardDesc || data.desc || '');
            const tags = (data.cardTechs?.length ? data.cardTechs : data.techs || [])
                .map((tag) => `<span>${escapeHtml(tag)}</span>`)
                .join('');
            const detailsLabel = uiTranslations[currentLanguage]?.portfolio?.viewDetails || 'Ver Detalhes';

            return `
                <li class="slide">
                    <div class="slide-content project-card">
                        <div class="project-thumb">
                            <img src="${escapeHtml(cover)}" alt="${title}" onerror="this.src='Imagens/placeholder.png'">
                        </div>
                        <div class="project-info">
                            <h4>${title}</h4>
                            <p class="project-desc">${desc}</p>
                            <div class="tech-tags">
                                ${tags}
                            </div>
                            <button class="btn btn-outline btn-sm" onclick="openProject('${id}')">${detailsLabel}</button>
                        </div>
                    </div>
                </li>
            `;
        }).join('');
    };

    let currentProject = null;
    let currentProjectId = null;
    let currentImgIndex = 0;

    const getYouTubeVideoId = (src) => {
        if (typeof src !== 'string') return null;
        const trimmedSrc = src.trim();
        if (!trimmedSrc) return null;

        try {
            const url = new URL(trimmedSrc);
            const host = url.hostname.replace(/^www\./, '');

            if (host === 'youtu.be') {
                const id = url.pathname.split('/').filter(Boolean)[0];
                return id || null;
            }

            if (host === 'youtube.com' || host === 'm.youtube.com') {
                if (url.pathname === '/watch') return url.searchParams.get('v');
                if (url.pathname.startsWith('/shorts/')) {
                    const id = url.pathname.split('/').filter(Boolean)[1];
                    return id || null;
                }
                if (url.pathname.startsWith('/embed/')) {
                    const id = url.pathname.split('/').filter(Boolean)[1];
                    return id || null;
                }
            }
        } catch (error) {
            return null;
        }

        return null;
    };

    const isVideoSource = (src) => typeof src === 'string' && src.toLowerCase().endsWith('.mp4');

    const buildYouTubeEmbedUrl = (videoId) => {
        const params = new URLSearchParams({
            autoplay: '1',
            rel: '0',
            playsinline: '1',
            modestbranding: '1',
            iv_load_policy: '3',
            enablejsapi: '1'
        });

        if (window.location.protocol === 'http:' || window.location.protocol === 'https:') {
            params.set('origin', window.location.origin);
            params.set('widget_referrer', window.location.href);
        }

        return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
    };

    const applyLanguage = (lang, persist = true) => {
        currentLanguage = lang === 'en' ? 'en' : 'pt';
        applyStaticLanguage(currentLanguage);
        applyProjectLanguage(currentLanguage);
        renderPortfolioCards();
        updatePortfolioSlider();

        const modal = document.getElementById('project-modal');
        if (modal && modal.classList.contains('active') && currentProjectId && projectsData[currentProjectId]) {
            const previousIndex = currentImgIndex;
            window.openProject(currentProjectId);
            const maxIndex = Math.max(0, projectsData[currentProjectId].images.length - 1);
            window.updateMainMedia(Math.min(previousIndex, maxIndex));
        }

        if (persist) {
            try {
                localStorage.setItem(LANGUAGE_STORAGE_KEY, currentLanguage);
            } catch (error) {
                console.warn('Language preference could not be saved.', error);
            }
        }
    };

    if (languageToggleBtn) {
        languageToggleBtn.addEventListener('click', () => {
            applyLanguage(currentLanguage === 'pt' ? 'en' : 'pt');
        });
    }

    let initialLanguage = detectDefaultLanguage();
    try {
        const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
        if (savedLanguage === 'pt' || savedLanguage === 'en') initialLanguage = savedLanguage;
    } catch (error) {
        console.warn('Language preference could not be loaded.', error);
    }

    applyLanguage(initialLanguage, false);
    initPortfolioSlider();

    window.openProject = (id) => {
        const data = projectsData[id];
        if (!data) return;

        currentProjectId = id;
        currentProject = data;
        currentImgIndex = 0;

        // Populate Texts
        const titleEl = document.getElementById('modal-title');
        const descEl = document.getElementById('modal-desc');
        const fullDescEl = document.getElementById('modal-full-desc');
        const tagsContainer = document.getElementById('modal-techs');

        if (titleEl) titleEl.innerText = data.title;
        if (descEl) descEl.innerText = data.desc;
        if (fullDescEl) fullDescEl.innerHTML = renderProjectDetails(data.details);

        // Populate Tags
        if (tagsContainer) tagsContainer.innerHTML = data.techs.map((t) => `<span>${escapeHtml(t)}</span>`).join('');

        // Populate Thumbs
        const thumbsContainer = document.getElementById('modal-thumbs');
        if (thumbsContainer) {
            thumbsContainer.innerHTML = '';
            if (data.images && data.images.length > 0) {
                data.images.forEach((src, index) => {
                    const isVideo = isVideoSource(src);
                    const youtubeId = getYouTubeVideoId(src);
                    const thumb = document.createElement('div');
                    thumb.className = `thumb-item ${index === 0 ? 'active' : ''}`;

                    if (isVideo) {
                        thumb.innerHTML = `<video src="${src}" muted style="pointer-events:none;"></video>`;
                    } else if (youtubeId) {
                        thumb.innerHTML = `<img src="https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg" alt="Thumb">`;
                    } else {
                        thumb.innerHTML = `<img src="${src}" alt="Thumb">`;
                    }

                    thumb.onclick = () => {
                        updateMainMedia(index);
                    };

                    thumbsContainer.appendChild(thumb);
                });
            }
        }

        updateMainMedia(0);

        // Show Modal
        const modal = document.getElementById('project-modal');
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    };

    window.updateMainMedia = (index) => {
        if (!currentProject || !currentProject.images) return;

        currentImgIndex = index;
        const src = currentProject.images[index];
        const isVideo = isVideoSource(src);
        const youtubeId = getYouTubeVideoId(src);
        const mainMedia = document.getElementById('modal-main-media');

        // Update Highlighting
        document.querySelectorAll('.thumb-item').forEach((t, i) => {
            if (i === index) t.classList.add('active');
            else t.classList.remove('active');
        });

        if (mainMedia) {
            // Updated to force full size filling, relying on CSS object-fit: contain
            if (isVideo) {
                // Using width/height 100% to match container, CSS handles aspect ratio
                mainMedia.innerHTML = `<video src="${src}" controls autoplay class="fade-in" style="width:100%; height:100%; object-fit:contain;"></video>`;
            } else if (youtubeId) {
                const embedUrl = buildYouTubeEmbedUrl(youtubeId);
                mainMedia.innerHTML = `<iframe src="${embedUrl}" title="YouTube video player" class="fade-in" referrerpolicy="origin-when-cross-origin" style="width:100%; height:100%; border:0;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
            } else {
                mainMedia.innerHTML = `<img src="${src}" alt="Main View" class="fade-in" style="width:100%; height:100%; object-fit:contain;">`;
            }
        }
    };

    window.navigateModal = (direction) => {
        if (!currentProject || !currentProject.images) return;

        let newIndex = currentImgIndex + direction;

        // Wrap around
        if (newIndex < 0) newIndex = currentProject.images.length - 1;
        if (newIndex >= currentProject.images.length) newIndex = 0;

        updateMainMedia(newIndex);
    };

    window.closeProjectModal = () => {
        const modal = document.getElementById('project-modal');
        if (modal) modal.classList.remove('active');
        document.body.style.overflow = '';

        // Stop videos
        const mainMedia = document.getElementById('modal-main-media');
        if (mainMedia) mainMedia.innerHTML = '';
    };

    // Close on click outside
    const modal = document.getElementById('project-modal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target.id === 'project-modal') {
                closeProjectModal();
            }
        });
    }

});
