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
                title: 'Dados e IA aplicados para <br><span class="text-gradient">transformar operação em decisão.</span>',
                subtitle: 'Desenvolvo softwares e ecossistemas inteligentes que se integram aos seus processos, <br>garantindo estabilidade, segurança e escalabilidade operacional.',
                primaryCta: 'Chamar no WhatsApp',
                secondaryCta: 'Fazer estimativa do projeto',
                badges: ['Data Science', 'IA Aplicada', 'Cloud-ready', 'Automação', 'Escalável', 'Seguro'],
                segments: ['Empreiteiras', 'Indústrias', 'Agronegócio', 'Comércio<br>e Varejo']
            },
            about: {
                heading: 'Quem sou',
                lead: 'Sou Mariélio Fernandes, Cientista de Dados:',
                body: 'Cientista de Dados orientado a lucro e eficiência operacional. Desenvolvo algoritmos que otimizam preços, reduzem perdas e maximizam margens com base em evidências, não em intuição. Estruturo problemas complexos de negócio, identifico oportunidades ocultas nos dados e entrego modelos que apoiam decisões estratégicas e aumentam a competitividade da empresa. Meu foco é simples transformar dados em resultado financeiro mensurável.',
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
                heading: 'Soluções tecnológicas orientadas a resultados',
                cards: [
                    {
                        title: 'Desenvolvimento de Software — Sistemas sob medida para operações críticas',
                        items: [
                            'Automação de processos internos e operacionais.',
                            'Integração entre sistemas isolados e legados.',
                            'Redução de retrabalho, erros e tarefas manuais.',
                            'Plataformas escaláveis preparadas para crescimento.'
                        ],
                        cta: 'Solicitar diagnóstico'
                    },
                    {
                        title: 'Data Science — Modelos analíticos para decisões estratégicas',
                        items: [
                            'Previsão de demanda, receita e comportamento.',
                            'Otimização de custos, preços e estoques.',
                            'Identificação de riscos e oportunidades ocultas.',
                            'Insights acionáveis a partir de grandes volumes de dados.'
                        ],
                        cta: 'Solicitar diagnóstico'
                    },
                    {
                        title: 'Inteligência Artificial — Automação inteligente aplicada ao negócio',
                        items: [
                            'Assistentes corporativos e agentes autônomos.',
                            'Automação de tarefas repetitivas e operacionais.',
                            'Análise inteligente de documentos e dados.',
                            'Redução de custos operacionais com IA.'
                        ],
                        cta: 'Solicitar diagnóstico'
                    },
                    {
                        title: 'Integrações e Dados — Arquitetura e governança de dados empresariais',
                        items: [
                            'Eliminação de silos e dados desconectados.',
                            'Pipelines ETL/ELT confiáveis e escaláveis.',
                            'Integração entre ERP, CRM e sistemas internos.',
                            'Dados consistentes para decisões estratégicas.'
                        ],
                        cta: 'Solicitar diagnóstico'
                    }
                ],
                extras: 'Também ofereço consultoria estratégica, diagnóstico tecnológico e capacitação de equipes para acelerar a transformação digital com segurança e impacto real.'
            },
            process: {
                heading: 'Metodologia de entrega de projetos',
                subtitle: 'Do diagnóstico inicial ao monitoramento contínuo, cada etapa é projetada para reduzir riscos, garantir qualidade e assegurar resultados sustentáveis.',
                steps: [
                    'Diagnóstico estratégico',
                    'Arquitetura e planejamento',
                    'Desenvolvimento e validação',
                    'Implantação segura',
                    'Monitoramento e evolução'
                ],
                descriptions: [
                    'Entendimento aprofundado do negócio, objetivos e restrições antes de qualquer decisão técnica.',
                    'Definição da solução com foco em escalabilidade, segurança e custo total de propriedade.',
                    'Construção incremental com testes contínuos e controle rigoroso de qualidade.',
                    'Publicação controlada com versionamento, rollback e proteção operacional.',
                    'Acompanhamento contínuo para estabilidade, desempenho e melhorias futuras.'
                ],
                note: 'Cada projeto é desenvolvido com práticas de engenharia profissional, incluindo versionamento, testes, observabilidade, backups, segurança de acesso e conformidade com LGPD.'
            },
            models: {
                heading: 'Como implementar soluções de dados e IA na sua empresa',
                subtitle: 'Escolha o nível de suporte ideal para gerar impacto financeiro rápido e sustentável.',
                cards: [
                    {
                        title: 'Diagnóstico Estratégico e Capacitação',
                        description: 'Descubra onde sua empresa perde dinheiro, quais oportunidades estão ocultas nos dados e como capturar valor com baixo risco.',
                        items: [
                            'Identificação de oportunidades de lucro e redução de custos.',
                            'Plano de ação priorizado por impacto financeiro.',
                            'Capacitação do time para execução autônoma.'
                        ],
                        note: 'Ideal para empresas que desejam começar com baixo risco.',
                        cta: 'AGENDAR DIAGNÓSTICO EXECUTIVO'
                    },
                    {
                        title: 'Solução Sob Medida Implementada',
                        description: 'Do problema ao sistema em produção, com impacto financeiro mensurável.',
                        items: [
                            'Construção completa da solução orientada ao negócio.',
                            'Integração com sistemas e dados existentes.',
                            'Evolução contínua e suporte estratégico.'
                        ],
                        note: 'Ideal para empresas que precisam de resultado rápido e completo.',
                        badge: 'Mais escolhido por empresas em transformação digital',
                        cta: 'SOLICITAR PROPOSTA DO PROJETO'
                    },
                    {
                        title: 'Plataforma Pronta para Uso',
                        description: 'Implante soluções avançadas rapidamente, sem necessidade de desenvolvimento interno.',
                        items: [
                            'Software pronto com implementação acelerada.',
                            'Escalável e orientado a operação real.',
                            'Atualizações e suporte contínuo.'
                        ],
                        note: 'Ideal para empresas que desejam escalar com menor custo.',
                        cta: 'VER OPÇÕES E VALORES'
                    }
                ],
                trustPoints: [
                    'Soluções focadas em aumento de margem e eficiência operacional.',
                    'Atendimento direto com especialista, sem intermediários.',
                    'Projetos orientados a impacto financeiro mensurável.'
                ]
            },
            portfolio: {
                heading: 'Portfólio / Cases',
                viewDetails: 'Ver Detalhes',
                viewVideo: 'Vídeo',
                viewDemo: 'Demo'
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
                title: 'Data and AI applied to <br><span class="text-gradient">turn operations into decisions.</span>',
                subtitle: 'I develop software and intelligent ecosystems that integrate with your processes, <br>ensuring operational stability, security, and scalability.',
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
                heading: 'Technology solutions focused on business outcomes',
                cards: [
                    {
                        title: 'Software Development — Tailored systems for critical operations',
                        items: [
                            'Automation of internal and operational processes.',
                            'Integration between isolated and legacy systems.',
                            'Reduction of rework, errors, and manual tasks.',
                            'Scalable platforms prepared for growth.'
                        ],
                        cta: 'Request diagnosis'
                    },
                    {
                        title: 'Data Science — Analytical models for strategic decisions',
                        items: [
                            'Forecasting for demand, revenue, and behavior.',
                            'Optimization of costs, pricing, and inventory.',
                            'Identification of hidden risks and opportunities.',
                            'Actionable insights from large data volumes.'
                        ],
                        cta: 'Request diagnosis'
                    },
                    {
                        title: 'Artificial Intelligence — Intelligent automation applied to business',
                        items: [
                            'Corporate assistants and autonomous agents.',
                            'Automation of repetitive and operational tasks.',
                            'Intelligent analysis of documents and data.',
                            'Reduction of operational costs with AI.'
                        ],
                        cta: 'Request diagnosis'
                    },
                    {
                        title: 'Integrations and Data — Enterprise data architecture and governance',
                        items: [
                            'Elimination of silos and disconnected data.',
                            'Reliable and scalable ETL/ELT pipelines.',
                            'Integration between ERP, CRM, and internal systems.',
                            'Consistent data for strategic decision-making.'
                        ],
                        cta: 'Request diagnosis'
                    }
                ],
                extras: 'I also offer strategic consulting, technology diagnosis, and team enablement to accelerate digital transformation with security and measurable impact.'
            },
            process: {
                heading: 'Project delivery methodology',
                subtitle: 'From initial diagnosis to continuous monitoring, each stage is designed to reduce risks, ensure quality, and deliver sustainable results.',
                steps: [
                    'Strategic diagnosis',
                    'Architecture and planning',
                    'Development and validation',
                    'Secure deployment',
                    'Monitoring and evolution'
                ],
                descriptions: [
                    'Deep assessment of business context, objectives, and constraints before any technical decision.',
                    'Solution definition focused on scalability, security, and total cost of ownership.',
                    'Incremental build with continuous testing and strict quality control.',
                    'Controlled release with versioning, rollback strategy, and operational protection.',
                    'Continuous follow-up for stability, performance, and future improvements.'
                ],
                note: 'Each project is delivered with professional engineering practices, including versioning, testing, observability, backups, access security, and privacy compliance.'
            },
            models: {
                heading: 'How to implement data and AI solutions in your company',
                subtitle: 'Choose the right support level to generate fast and sustainable financial impact.',
                cards: [
                    {
                        title: 'Strategic Diagnosis and Enablement',
                        description: 'Identify where money is being lost, uncover hidden opportunities in your data, and capture value with low risk.',
                        items: [
                            'Identify profit opportunities and cost reduction levers.',
                            'Action plan prioritized by financial impact.',
                            'Team enablement for autonomous execution.'
                        ],
                        note: 'Ideal for companies that want to start with lower risk.',
                        cta: 'SCHEDULE AN EXECUTIVE DIAGNOSIS'
                    },
                    {
                        title: 'Tailored Solution Implemented',
                        description: 'From business problem to production system, with measurable financial impact.',
                        items: [
                            'End-to-end build aligned to business outcomes.',
                            'Integration with existing systems and data.',
                            'Continuous evolution and strategic support.'
                        ],
                        note: 'Ideal for companies that need fast and complete outcomes.',
                        badge: 'Most chosen by companies in digital transformation',
                        cta: 'REQUEST A PROJECT PROPOSAL'
                    },
                    {
                        title: 'Ready-to-Use Platform',
                        description: 'Deploy advanced solutions quickly, without the need for internal development.',
                        items: [
                            'Ready software with accelerated implementation.',
                            'Scalable and designed for real operations.',
                            'Ongoing updates and support.'
                        ],
                        note: 'Ideal for companies that want to scale at lower cost.',
                        cta: 'SEE OPTIONS AND PRICING'
                    }
                ],
                trustPoints: [
                    'Solutions focused on margin growth and operational efficiency.',
                    'Direct service with a specialist, no intermediaries.',
                    'Projects oriented to measurable financial impact.'
                ]
            },
            portfolio: {
                heading: 'Portfolio / Cases',
                viewDetails: 'View Details',
                viewVideo: 'Video',
                viewDemo: 'Demo'
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
        setText('#process .process-subtitle', content.process.subtitle);
        const processSteps = document.querySelectorAll('#process .step h4');
        content.process.steps.forEach((step, index) => {
            if (processSteps[index]) processSteps[index].textContent = step;
        });
        const processDescriptions = document.querySelectorAll('#process .step .step-desc');
        content.process.descriptions?.forEach((description, index) => {
            if (processDescriptions[index]) processDescriptions[index].textContent = description;
        });
        setText('#process .process-note', content.process.note);

        setText('#models h2', content.models.heading);
        setText('#models .models-subtitle', content.models.subtitle);
        const modelCards = document.querySelectorAll('#models .model-card');
        modelCards.forEach((card, index) => {
            const cardData = content.models.cards[index];
            if (!cardData) return;

            const titleEl = card.querySelector('h3');
            if (titleEl) titleEl.textContent = cardData.title;

            const descriptionEl = card.querySelector('.model-card-description');
            if (descriptionEl) descriptionEl.textContent = cardData.description;

            const listItems = card.querySelectorAll('li');
            cardData.items.forEach((item, itemIndex) => {
                preserveIconAndSetText(listItems[itemIndex], item);
            });

            const noteEl = card.querySelector('.model-card-note');
            if (noteEl) noteEl.textContent = cardData.note;

            const badgeEl = card.querySelector('.model-badge');
            if (badgeEl) {
                if (cardData.badge) {
                    preserveIconAndSetText(badgeEl, cardData.badge);
                    badgeEl.style.display = 'inline-flex';
                } else {
                    badgeEl.style.display = 'none';
                }
            }

            const cta = card.querySelector('a');
            if (cta) cta.textContent = cardData.cta;
        });

        const modelTrustPoints = document.querySelectorAll('#models .models-trust-list li');
        content.models.trustPoints.forEach((point, index) => {
            preserveIconAndSetText(modelTrustPoints[index], point);
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

            // --- SCORE TO LABEL ---
            // Thresholds: Low <= 8, Medium <= 15, High > 15
            if (complexityScore <= 8) {
                complexityKey = 'low';
            } else if (complexityScore <= 15) {
                complexityKey = 'medium';
            } else {
                complexityKey = 'high';
            }
            const complexityLabel = runtime.complexity[complexityKey];
            const leadTimeByComplexity = currentLanguage === 'en'
                ? {
                    low: '1 week',
                    medium: '15 to 30 days',
                    high: '1 to 2 months'
                }
                : {
                    low: '1 semana',
                    medium: '15 a 30 dias',
                    high: '1 a 2 meses'
                };
            const leadTime = leadTimeByComplexity[complexityKey];

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
            title: 'AgroSupply — ERP de Suprimentos Agrícolas com IA',
            cardTitle: 'AgroSupply — ERP de Suprimentos Agrícolas com IA',
            desc: 'AgroSupply é um ERP de suprimentos agrícolas que elimina rupturas de estoque, reduz desperdícios e aumenta a previsibilidade operacional. Centraliza compras, consumo, inventário e indicadores para decisões rápidas e redução do capital parado em insumos.',
            cardDesc: 'AgroSupply é um ERP de suprimentos agrícolas que elimina rupturas de estoque, reduz desperdícios e aumenta a previsibilidade operacional. Centraliza compras, consumo, inventário e indicadores para decisões rápidas e redução do capital parado em insumos.',
            techs: ['Python', 'Flask', 'LangChain', 'PostgreSQL'],
            cardTechs: ['Python', 'Flask', 'LangChain', 'PostgreSQL'],
            videoUrl: 'https://www.youtube.com/watch?v=gImBzFt9Tuw&list=PLgClOBsYlhWUh9K5eY8Dqcnk0x7e3eq7v&index=1',
            details: {
                desafio: 'Rupturas, desperdícios e capital parado em insumos reduziam margem e previsibilidade operacional.',
                solucao: 'ERP de suprimentos com IA para centralizar compras, consumo, inventário e KPIs em uma única operação.',
                resultados: 'Redução de perdas, decisões mais rápidas e maior controle financeiro sobre o estoque.'
            },
            images: [
                'portfólio/Projeto 01 - AgroSupply/1.png', 'portfólio/Projeto 01 - AgroSupply/2.png',
                'portfólio/Projeto 01 - AgroSupply/3.png', 'portfólio/Projeto 01 - AgroSupply/4.png',
                'portfólio/Projeto 01 - AgroSupply/5.png', 'portfólio/Projeto 01 - AgroSupply/6.png',
                'portfólio/Projeto 01 - AgroSupply/7.png', 'portfólio/Projeto 01 - AgroSupply/8.png',
                'https://www.youtube.com/watch?v=gImBzFt9Tuw&list=PLgClOBsYlhWUh9K5eY8Dqcnk0x7e3eq7v&index=1'
            ]
        },
        SolarisTech: {
            title: 'SolarisTech — Gestão Inteligente de Micro Usinas Fotovoltaicas',
            cardTitle: 'SolarisTech — Gestão Inteligente de Micro Usinas Fotovoltaicas',
            desc: 'SolarisTech monitora micro usinas fotovoltaicas em tempo real para reduzir perdas, detectar falhas e maximizar a rentabilidade da geração. Une telemetria e dados climáticos para análise de eficiência, previsões e alertas operacionais.',
            cardDesc: 'SolarisTech monitora micro usinas fotovoltaicas em tempo real para reduzir perdas, detectar falhas e maximizar a rentabilidade da geração. Une telemetria e dados climáticos para análise de eficiência, previsões e alertas operacionais.',
            techs: ['Python', 'Flask', 'Machine Learning', 'Open-Meteo', 'Telemetria'],
            cardTechs: ['Python', 'Flask', 'Machine Learning', 'Open-Meteo', 'Telemetria'],
            videoUrl: 'https://www.youtube.com/watch?v=fIjS0CPNMe8&list=PLgClOBsYlhWUh9K5eY8Dqcnk0x7e3eq7v&index=2',
            details: {
                desafio: 'Perdas de geração e falhas eram identificadas tarde, reduzindo a rentabilidade das micro usinas.',
                solucao: 'Monitoramento em tempo real com telemetria e clima para análise de eficiência, previsão e alertas operacionais.',
                resultados: 'Menos perdas, resposta preventiva a incidentes e maior previsibilidade da receita energética.'
            },
            images: [
                'portfólio/Projeto 02 - Solaristech/Capa Solaristech.png', 'portfólio/Projeto 02 - Solaristech/2.png',
                'portfólio/Projeto 02 - Solaristech/3.png', 'portfólio/Projeto 02 - Solaristech/4.png',
                'portfólio/Projeto 02 - Solaristech/5.png', 'portfólio/Projeto 02 - Solaristech/6.png',
                'portfólio/Projeto 02 - Solaristech/7.png', 'portfólio/Projeto 02 - Solaristech/8.png',
                'https://www.youtube.com/watch?v=fIjS0CPNMe8&list=PLgClOBsYlhWUh9K5eY8Dqcnk0x7e3eq7v&index=2'
            ]
        },
        StockPredict: {
            title: 'StockPredict — Gestão Inteligente de Estoques com IA',
            cardTitle: 'StockPredict — Gestão Inteligente de Estoques com IA',
            desc: 'StockPredict reduz perdas por excesso e por falta de produtos usando IA para prever demanda e recomendar reposição. Ideal para melhorar giro de estoque, reduzir custo operacional e aumentar a precisão das decisões de compra.',
            cardDesc: 'StockPredict reduz perdas por excesso e por falta de produtos usando IA para prever demanda e recomendar reposição. Ideal para melhorar giro de estoque, reduzir custo operacional e aumentar a precisão das decisões de compra.',
            techs: ['Python', 'Streamlit', 'LangChain', 'PostgreSQL', 'Machine Learning'],
            cardTechs: ['Python', 'Streamlit', 'LangChain', 'PostgreSQL', 'Machine Learning'],
            videoUrl: 'https://www.youtube.com/watch?v=_GvT0B5Iv8w&list=PLgClOBsYlhWUh9K5eY8Dqcnk0x7e3eq7v&index=3',
            demoUrl: 'https://stockpredict-cpfvhyuc7rexcj9jgxnpyf.streamlit.app/',
            details: {
                desafio: 'Ruptura e excesso de estoque elevavam perdas de venda, custo operacional e capital imobilizado.',
                solucao: 'IA para previsão de demanda e recomendação de reposição com base em histórico e sazonalidade.',
                resultados: 'Mais giro, menor custo de armazenagem e decisões de compra com maior precisão.'
            },
            images: [
                'portfólio/Projeto 03 - stockpredict/1.png', 'portfólio/Projeto 03 - stockpredict/2.png',
                'portfólio/Projeto 03 - stockpredict/3.png', 'portfólio/Projeto 03 - stockpredict/4.png',
                'portfólio/Projeto 03 - stockpredict/5.png', 'portfólio/Projeto 03 - stockpredict/6.png',
                'portfólio/Projeto 03 - stockpredict/7.png', 'portfólio/Projeto 03 - stockpredict/8.png',
                'portfólio/Projeto 03 - stockpredict/9.png', 'portfólio/Projeto 03 - stockpredict/10.png',
                'portfólio/Projeto 03 - stockpredict/12.png', 'portfólio/Projeto 03 - stockpredict/13.png',
                'portfólio/Projeto 03 - stockpredict/14.png', 'portfólio/Projeto 03 - stockpredict/15.png',
                'https://www.youtube.com/watch?v=_GvT0B5Iv8w&list=PLgClOBsYlhWUh9K5eY8Dqcnk0x7e3eq7v&index=3'
            ]
        },
        LogiChainAI: {
            title: 'LogiChain AI — Gestão Inteligente do Ciclo de Vida de Contratos (CLM)',
            cardTitle: 'LogiChain AI — Gestão Inteligente do Ciclo de Vida de Contratos (CLM)',
            desc: 'LogiChain AI organiza e controla contratos do início ao fim para reduzir riscos, evitar perdas e aumentar governança. Automatiza versionamento, auditoria de status e indicadores de compliance e performance de fornecedores.',
            cardDesc: 'LogiChain AI organiza e controla contratos do início ao fim para reduzir riscos, evitar perdas e aumentar governança. Automatiza versionamento, auditoria de status e indicadores de compliance e performance de fornecedores.',
            techs: ['Python', 'Streamlit', 'LangChain', 'PostgreSQL', 'Machine Learning'],
            cardTechs: ['Python', 'Streamlit', 'LangChain', 'PostgreSQL', 'Machine Learning'],
            videoUrl: 'https://www.youtube.com/watch?v=TScFIPtYP1o&list=PLgClOBsYlhWUh9K5eY8Dqcnk0x7e3eq7v&index=4',
            demoUrl: 'https://logichain-ai-mhppnlcmpcftxmjy2zmftn.streamlit.app/',
            details: {
                desafio: 'Contratos sem rastreabilidade aumentavam risco jurídico, perdas financeiras e baixa governança.',
                solucao: 'CLM com IA para versionamento, auditoria de status e indicadores de compliance e performance.',
                resultados: 'Redução de risco, menos perdas contratuais e gestão mais previsível de fornecedores.'
            },
            images: [
                'portfólio/Projeto 04 - LogiChain AI/1.png', 'portfólio/Projeto 04 - LogiChain AI/2.png',
                'portfólio/Projeto 04 - LogiChain AI/3.png', 'portfólio/Projeto 04 - LogiChain AI/4.png',
                'portfólio/Projeto 04 - LogiChain AI/5.png', 'portfólio/Projeto 04 - LogiChain AI/6.png',
                'portfólio/Projeto 04 - LogiChain AI/7.png', 'portfólio/Projeto 04 - LogiChain AI/8.png',
                'portfólio/Projeto 04 - LogiChain AI/9.png', 'portfólio/Projeto 04 - LogiChain AI/10.png',
                'portfólio/Projeto 04 - LogiChain AI/11.png', 'portfólio/Projeto 04 - LogiChain AI/12.png',
                'https://www.youtube.com/watch?v=TScFIPtYP1o&list=PLgClOBsYlhWUh9K5eY8Dqcnk0x7e3eq7v&index=4'
            ]
        },
        HidroGestor: {
            title: 'HidroGestor — Gestão Inteligente da Irrigação com IA',
            cardTitle: 'HidroGestor — Gestão Inteligente da Irrigação com IA',
            desc: 'HidroGestor otimiza irrigação com monitoramento de água, energia e clima para reduzir desperdícios e elevar produtividade. Traz planejamento baseado em dados meteorológicos e simulações para decisões mais seguras no campo.',
            cardDesc: 'HidroGestor otimiza irrigação com monitoramento de água, energia e clima para reduzir desperdícios e elevar produtividade. Traz planejamento baseado em dados meteorológicos e simulações para decisões mais seguras no campo.',
            techs: ['Python', 'Streamlit', 'LangChain', 'PostgreSQL', 'Open-Meteo', 'Telemetria', 'Machine Learning'],
            cardTechs: ['Python', 'Streamlit', 'LangChain', 'PostgreSQL', 'Open-Meteo', 'Telemetria', 'Machine Learning'],
            videoUrl: 'https://www.youtube.com/watch?v=NWg78fgQzWw&list=PLgClOBsYlhWUh9K5eY8Dqcnk0x7e3eq7v&index=5',
            demoUrl: 'https://tztk9tr4p3otxkwkhseuvt.streamlit.app/',
            details: {
                desafio: 'Irrigação sem dados elevava desperdícios de água e energia e aumentava risco operacional no campo.',
                solucao: 'Monitoramento de recursos, clima e simulações para planejar irrigação com segurança e previsibilidade.',
                resultados: 'Redução de custos, uso eficiente de recursos e ganho consistente de produtividade agrícola.'
            },
            images: [
                'portfólio/Projeto 05 - Hidro Gestor/1.png', 'portfólio/Projeto 05 - Hidro Gestor/2.png',
                'portfólio/Projeto 05 - Hidro Gestor/3.png', 'portfólio/Projeto 05 - Hidro Gestor/4.png',
                'portfólio/Projeto 05 - Hidro Gestor/5.png', 'portfólio/Projeto 05 - Hidro Gestor/6.png',
                'portfólio/Projeto 05 - Hidro Gestor/7.png', 'portfólio/Projeto 05 - Hidro Gestor/8.png',
                'portfólio/Projeto 05 - Hidro Gestor/9.png', 'portfólio/Projeto 05 - Hidro Gestor/10.png',
                'portfólio/Projeto 05 - Hidro Gestor/11.png', 'portfólio/Projeto 05 - Hidro Gestor/12.png',
                'portfólio/Projeto 05 - Hidro Gestor/13.png',
                'https://www.youtube.com/watch?v=NWg78fgQzWw&list=PLgClOBsYlhWUh9K5eY8Dqcnk0x7e3eq7v&index=5'
            ]
        }
    };

    const projectBaseTexts = JSON.parse(JSON.stringify(projectsData));
    const projectTranslationsEn = {
        AgroSupply: {
            title: 'AgroSupply — Agricultural Supply ERP with AI',
            cardTitle: 'AgroSupply — Agricultural Supply ERP with AI',
            desc: 'AgroSupply is an agricultural supply ERP that prevents stockouts, reduces waste, and improves operational predictability. It centralizes purchasing, consumption, inventory, and KPIs for faster decisions and less working capital trapped in inputs.',
            cardDesc: 'AgroSupply is an agricultural supply ERP that prevents stockouts, reduces waste, and improves operational predictability. It centralizes purchasing, consumption, inventory, and KPIs for faster decisions and less working capital trapped in inputs.',
            techs: ['Python', 'Flask', 'LangChain', 'PostgreSQL'],
            cardTechs: ['Python', 'Flask', 'LangChain', 'PostgreSQL'],
            details: {
                desafio: 'Stockouts, waste, and tied-up inventory were hurting margins and operational predictability.',
                solucao: 'Supply ERP with AI centralizing purchasing, consumption, inventory, and KPIs in a single workflow.',
                resultados: 'Lower losses, faster decisions, and tighter financial control over inventory.'
            }
        },
        SolarisTech: {
            title: 'SolarisTech — Intelligent Management of Micro Photovoltaic Plants',
            cardTitle: 'SolarisTech — Intelligent Management of Micro Photovoltaic Plants',
            desc: 'SolarisTech monitors micro photovoltaic plants in real time to reduce losses, detect failures, and maximize generation profitability. It combines telemetry and weather data for efficiency analysis, forecasting, and operational alerts.',
            cardDesc: 'SolarisTech monitors micro photovoltaic plants in real time to reduce losses, detect failures, and maximize generation profitability. It combines telemetry and weather data for efficiency analysis, forecasting, and operational alerts.',
            techs: ['Python', 'Flask', 'Machine Learning', 'Open-Meteo', 'Telemetry'],
            cardTechs: ['Python', 'Flask', 'Machine Learning', 'Open-Meteo', 'Telemetry'],
            details: {
                desafio: 'Generation losses and failures were detected too late, reducing micro-plant profitability.',
                solucao: 'Real-time monitoring with telemetry and weather data for efficiency analysis, forecasting, and alerts.',
                resultados: 'Lower losses, proactive response to incidents, and stronger revenue predictability.'
            }
        },
        StockPredict: {
            title: 'StockPredict — Intelligent Inventory Management with AI',
            cardTitle: 'StockPredict — Intelligent Inventory Management with AI',
            desc: 'StockPredict reduces losses from overstock and stockouts by using AI to forecast demand and recommend replenishment. It improves inventory turnover, lowers operating costs, and increases purchasing decision accuracy.',
            cardDesc: 'StockPredict reduces losses from overstock and stockouts by using AI to forecast demand and recommend replenishment. It improves inventory turnover, lowers operating costs, and increases purchasing decision accuracy.',
            techs: ['Python', 'Streamlit', 'LangChain', 'PostgreSQL', 'Machine Learning'],
            cardTechs: ['Python', 'Streamlit', 'LangChain', 'PostgreSQL', 'Machine Learning'],
            details: {
                desafio: 'Overstock and stockouts were increasing lost sales, operating costs, and tied-up cash.',
                solucao: 'AI demand forecasting and replenishment recommendations using historical and seasonal data.',
                resultados: 'Higher inventory turnover, lower storage costs, and more accurate purchasing decisions.'
            }
        },
        LogiChainAI: {
            title: 'LogiChain AI — Intelligent Contract Lifecycle Management (CLM)',
            cardTitle: 'LogiChain AI — Intelligent Contract Lifecycle Management (CLM)',
            desc: 'LogiChain AI organizes and controls contracts end-to-end to reduce risk, avoid losses, and strengthen governance. It automates versioning, status auditing, and compliance/performance indicators for suppliers.',
            cardDesc: 'LogiChain AI organizes and controls contracts end-to-end to reduce risk, avoid losses, and strengthen governance. It automates versioning, status auditing, and compliance/performance indicators for suppliers.',
            techs: ['Python', 'Streamlit', 'LangChain', 'PostgreSQL', 'Machine Learning'],
            cardTechs: ['Python', 'Streamlit', 'LangChain', 'PostgreSQL', 'Machine Learning'],
            details: {
                desafio: 'Low contract traceability increased legal risk, financial losses, and governance gaps.',
                solucao: 'AI-powered CLM for versioning, status audits, and compliance and performance indicators.',
                resultados: 'Lower risk exposure, fewer contractual losses, and more predictable supplier governance.'
            }
        },
        HidroGestor: {
            title: 'HidroGestor — Intelligent Irrigation Management with AI',
            cardTitle: 'HidroGestor — Intelligent Irrigation Management with AI',
            desc: 'HidroGestor optimizes irrigation by monitoring water, energy, and weather to reduce waste and improve productivity. It brings weather-based planning and simulations for safer field decisions.',
            cardDesc: 'HidroGestor optimizes irrigation by monitoring water, energy, and weather to reduce waste and improve productivity. It brings weather-based planning and simulations for safer field decisions.',
            techs: ['Python', 'Streamlit', 'LangChain', 'PostgreSQL', 'Open-Meteo', 'Telemetry', 'Machine Learning'],
            cardTechs: ['Python', 'Streamlit', 'LangChain', 'PostgreSQL', 'Open-Meteo', 'Telemetry', 'Machine Learning'],
            details: {
                desafio: 'Irrigation without reliable data increased water and energy waste and raised operational risk.',
                solucao: 'Intelligent planning with weather data, telemetry, and simulations for safer irrigation decisions.',
                resultados: 'Lower operating costs, better resource efficiency, and sustained productivity gains.'
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
        'SolarisTech',
        'StockPredict',
        'LogiChainAI',
        'HidroGestor'
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
            const demoLabel = uiTranslations[currentLanguage]?.portfolio?.viewDemo || 'Demo';
            const compactActionStyle = 'padding:8px 14px; font-size:0.75rem; line-height:1.1; white-space:nowrap;';
            const actions = [
                `<button class="btn btn-outline btn-sm" style="${compactActionStyle}" onclick="openProject('${id}')">${detailsLabel}</button>`
            ];

            if (data.demoUrl) {
                actions.push(`<a class="btn btn-outline btn-sm" style="${compactActionStyle}" href="${escapeHtml(data.demoUrl)}" target="_blank" rel="noopener noreferrer">${demoLabel}</a>`);
            }

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
                            <div style="display:flex; flex-wrap:nowrap; gap:8px; align-items:center;">
                                ${actions.join('')}
                            </div>
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
