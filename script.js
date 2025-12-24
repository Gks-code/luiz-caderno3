 
        // ===== CONTROLE DO HEADER QUE SOME AO ROLAR =====
        let lastScrollTop = 0;
        const header = document.querySelector('header');
        const scrollThreshold = 100; // Quantidade de pixels para começar a esconder
        
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            
            // Determinar se estamos no topo da página
            if (scrollTop === 0) {
                header.classList.remove('scrolled');
                header.classList.add('at-top');
                header.classList.remove('hidden');
            } else {
                header.classList.remove('at-top');
                header.classList.add('scrolled');
            }
            
            // Lógica para esconder/mostrar o header baseado na direção do scroll
            if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
                // Rolando para baixo - esconder header
                header.classList.add('hidden');
            } else {
                // Rolando para cima - mostrar header
                header.classList.remove('hidden');
            }
            
            // Se estiver perto do final da página, mostrar o header novamente
            if (scrollTop + windowHeight >= documentHeight - 100) {
                header.classList.remove('hidden');
            }
            
            lastScrollTop = scrollTop;
        });
        
        // ===== MENU MOBILE =====
        const menuToggle = document.getElementById('menuToggle');
        const mainNav = document.getElementById('mainNav');
        
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            
            // Mudar ícone do botão
            const icon = menuToggle.querySelector('i');
            if (mainNav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Fechar menu ao clicar em um link (apenas mobile)
        document.querySelectorAll('nav a').forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 767) {
                    mainNav.classList.remove('active');
                    const icon = menuToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
        
        // ===== SMOOTH SCROLLING =====
        document.querySelectorAll('nav a, .footer-column a').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                if(this.getAttribute('href').startsWith('#')) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    
                    if(targetElement) {
                        // Ajuste para mobile - calcular offset baseado no tamanho da tela
                        const offset = window.innerWidth < 768 ? 60 : 80;
                        
                        window.scrollTo({
                            top: targetElement.offsetTop - offset,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
        
        // ===== EFEITO DE DIGITAÇÃO NO TÍTULO =====
        const heroTitle = document.querySelector('.hero h1');
        const originalText = heroTitle.innerHTML;
        heroTitle.innerHTML = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                heroTitle.innerHTML += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        // Iniciar efeito de digitação quando a página carregar
        window.addEventListener('load', () => {
            setTimeout(typeWriter, 500);
            
            // Remover indicador de scroll após alguns segundos
            setTimeout(() => {
                const scrollIndicator = document.querySelector('.scroll-indicator');
                if (scrollIndicator) {
                    scrollIndicator.style.opacity = '0';
                    scrollIndicator.style.transition = 'opacity 1s';
                    setTimeout(() => {
                        scrollIndicator.style.display = 'none';
                    }, 1000);
                }
            }, 5000);
        });
        
        // ===== DETECTAR E MOSTRAR O TIPO DE DISPOSITIVO =====
        window.addEventListener('load', function() {
            const isMobile = window.innerWidth < 768;
            const isTablet = window.innerWidth >= 768 && window.innerWidth < 992;
            const isDesktop = window.innerWidth >= 992;
            
            console.log(`Dispositivo detectado: ${isMobile ? 'Celular' : isTablet ? 'Tablet' : 'PC'}`);
        });
        
        // ===== REAJUSTAR LAYOUT QUANDO A JANELA FOR REDIMENSIONADA =====
        window.addEventListener('resize', function() {
            // Se a tela for maior que mobile, garantir que o menu não fique aberto
            if (window.innerWidth > 767) {
                mainNav.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    