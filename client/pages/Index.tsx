import { useState, useEffect } from "react";

interface Comment {
  id: string;
  name: string;
  avatar: string;
  text: string;
  time: string;
  replies?: Comment[];
  isHighlighted?: boolean;
}

export default function Index() {
  const [showCTAButton, setShowCTAButton] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // VSL settings
  const BUTTON_SHOW_TIME = 12 * 60 + 20; // Show button at 12:20 (740 seconds)

  useEffect(() => {
    let checkPlayerInterval: NodeJS.Timeout;
    let videoElement: HTMLVideoElement | null = null;
    
    const script = document.createElement('script');
    script.src="https://scripts.converteai.net/cd080c38-edae-4bc7-a6d5-8dd4c2328a90/players/68cb3b25ecf375f84cb1475d/v4/player.js";
    script.async=true;
    document.head.appendChild(script);
    
    // Check for smartplayer availability
    checkPlayerInterval = setInterval(() => {
      if (window.smartplayer && window.smartplayer.instances && window.smartplayer.instances.length > 0) {
        const playerInstance = window.smartplayer.instances[0];
        if (playerInstance && playerInstance.video && typeof playerInstance.video.addEventListener === 'function') {
          videoElement = playerInstance.video;
          
          // Add timeupdate event listener
          const handleTimeUpdate = () => {
            if (videoElement && videoElement.currentTime >= BUTTON_SHOW_TIME) {
              setShowCTAButton(true);
            }
          };
          
          videoElement.addEventListener('timeupdate', handleTimeUpdate);
          
          // Clear the interval once we've set up the listener
          clearInterval(checkPlayerInterval);
        }
      }
    }, 1000);

    // Scroll progress and sticky bar logic
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      
      setScrollProgress(progress);
      
      // Show sticky bar after 30% scroll
      if (progress > 30) {
        setShowStickyBar(true);
      }
    };

    // Show sticky bar after 45s
    const stickyTimer = setTimeout(() => {
      setShowStickyBar(true);
    }, 45000);

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      if (checkPlayerInterval) {
        clearInterval(checkPlayerInterval);
      }
      if (videoElement && typeof videoElement.removeEventListener === 'function') {
        videoElement.removeEventListener('timeupdate', () => {});
      }
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(stickyTimer);
    };
  }, []);

  const formatDate = (d: Date) => {
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yyyy = d.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  };
  const todayStr = formatDate(new Date());

  const comments: Comment[] = [
    {
      id: "1",
      name: "Mariana Souza disse:",
      avatar:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=101&h=101&fit=crop&crop=face",
      text: "Ontem eu estava atolado em dívidas e ansiedade. Hoje acordei com uma sensação de leveza e oportunidades batendo à porta. A Frequência da Alma realmente funciona!",
      time: "Responder · Curtir · Seguir · 3 min",
    },
    {
      id: "2",
      name: "Fernanda Alves disse:",
      avatar:
        "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=101&h=101&fit=crop&crop=face",
      text: "Eu também achei que seria só mais uma promessa vazia… mas em menos de 24 horas percebi meu corpo mais leve, minha mente clara e até clientes novos surgiram do nada. É impressionante!",
      time: "Responder · Curtir · Seguir · 4 min",
    },
    {
      id: "3",
      name: "Ana Pereira disse:",
      avatar:
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=101&h=101&fit=crop&crop=face",
      text: "Não vou mentir… antes parecia que minha vida não saía do lugar. Agora, em poucos dias, tudo começou a fluir: dinheiro inesperado, novas conexões e paz interior. É como se eu tivesse destravado minha realidade.",
      time: "Responder · Curtir · Seguir · 5 min",
    },
    {
      id: "4",
      name: "Juliana Lima disse:",
      avatar:
        "https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=101&h=101&fit=crop&crop=face",
      text: "Será que realmente funciona? Eu vi tanta coisa parecida que quase não acreditei… mas depois de testar, vi que não é milagre barato. É ciência + espiritualidade aplicadas. Os resultados são reais.",
      time: "Responder · Curtir · Seguir · 16 min",
      replies: [
        {
          id: "4-1",
          name: "Luciana Martins disse:",
          avatar:
            "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=101&h=101&fit=crop&crop=face",
          text: "Eu comprei há um mês e posso garantir: não é ilusão. Segui as instruções e em poucos dias comecei a ver mudanças reais — até minha saúde emocional melhorou. Vale cada centavo.",
          time: "Responder · Curtir · Seguir · 14 min",
          isHighlighted: true,
        },
        {
          id: "4-2",
          name: "Patrícia Nogueira disse:",
          avatar:
            "https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=101&h=101&fit=crop&crop=face",
          text: "Concordo totalmente. Minha energia mudou, minhas conversas ficaram mais leves e até oportunidades profissionais surgiram do nada. Recomendo 100%.",
          time: "Responder · Curtir · Seguir · 10 min",
          isHighlighted: true,
        },
      ],
    },
    {
      id: "5",
      name: "Carla Mendes disse:",
      avatar:
        "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=101&h=101&fit=crop&crop=face",
      text: "Obrigado por compartilharem suas experiências. Eu confiei, comprei e não me arrependo: minha frequência mudou completamente. As coisas começaram a dar certo de uma forma impressionante.",
      time: "Responder · Curtir · Seguir · 5 min",
      isHighlighted: true,
    },
    {
      id: "6",
      name: "Fabiana Rocha disse:",
      avatar:
        "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=101&h=101&fit=crop&crop=face",
      text: "Depois de ler os comentários, criei coragem e entrei. Posso afirmar: o acesso foi imediato, as práticas são fáceis e os resultados vieram rápido. Recomendo sem pensar duas vezes.",
      time: "Responder · Curtir · Seguir · 35 min",
    },
  ];

  const handlePurchase = () => {
    window.open('https://www.checkout.com', '_blank');
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/5511999999999', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B0B0F] to-[#1A1A22]">
      {/* Top Warning Banner */}
      <div className="bg-red-600 py-2 px-6">
        <div className="max-w-[1040px] mx-auto text-center">
          <p className="text-[#F2F4F7] text-sm font-medium">
            ⚡ 487 pessoas estão assistindo agora. Devido à alta demanda, esta apresentação ficará disponível até {todayStr}.
          </p>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-[1040px] mx-auto px-6">
        {/* Hero Section */}
        <div className="py-12 md:py-16 text-center">
          {/* Headlines */}
          <div className="mb-12">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#F2F4F7] mb-6 leading-tight">
              O TOP #1 ERRO QUE FAZ PESSOAS QUEBRADAS NÃO ATIVAREM A{" "}
              <span className="text-[#FFD166]">FREQUÊNCIA DA ALMA</span>{" "}
              QUE DESTRAVA{" "}
              <span className="text-[#FFD166]">PROSPERIDADE, ABUNDÂNCIA E CLAREZA</span>.
            </h1>
          </div>

          {/* Video Section */}
          <div className="mb-12">
            <div className="relative max-w-[640px] mx-auto">
              <div className="relative rounded-2xl overflow-hidden shadow-[0_12px_30px_rgba(0,0,0,0.35)] hover:shadow-[0_16px_40px_rgba(255,209,102,0.1)] transition-all duration-300">
                <vturb-smartplayer 
                  id="vid-68cb3b25ecf375f84cb1475d" 
                  style={{ 
                    display: 'block', 
                    margin: '0 auto', 
                    width: '100%', 
                    maxWidth: '400px'
                  }}
                />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Facebook Comments Section - DO NOT TOUCH INTERNAL STRUCTURE */}
      <div className="max-w-[1040px] mx-auto px-6 mt-12 mb-16">
        <div className="bg-white rounded-xl p-6 md:p-8">
          {/* Comments Header */}
          <div className="border-b border-gray-200 pb-4 mb-6">
            <h3 className="text-gray-700 font-medium text-sm">
              24 Comentarios
            </h3>
          </div>

          {/* Comments List */}
          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment.id} className="space-y-4">
                {/* Main Comment */}
                <div className="flex space-x-3">
                  <img
                    src={comment.avatar}
                    alt={comment.name}
                    className="w-12 h-12 rounded-full flex-shrink-0"
                  />
                  <div className="flex-1">
                    <div className="text-blue-700 font-semibold text-sm mb-1">
                      {comment.name}
                    </div>
                    <div className="text-gray-800 text-sm leading-relaxed">
                      {comment.text}
                    </div>
                    <div className="text-gray-500 text-xs mt-2">
                      {comment.time}
                    </div>
                  </div>
                </div>

                {/* Replies */}
                {comment.replies && (
                  <div className="ml-16 space-y-4">
                    {comment.replies.map((reply) => (
                      <div
                        key={reply.id}
                        className="flex space-x-3 border-l-2 border-gray-200 pl-4"
                      >
                        <img
                          src={reply.avatar}
                          alt={reply.name}
                          className="w-12 h-12 rounded-full flex-shrink-0"
                        />
                        <div className="flex-1">
                          <div className="text-blue-700 font-semibold text-sm mb-1">
                            {reply.name}
                          </div>
                          <div
                            className={`text-gray-800 text-sm leading-relaxed ${reply.isHighlighted ? "italic" : ""}`}
                          >
                            {reply.text}
                          </div>
                          <div className="text-gray-500 text-xs mt-2">
                            {reply.time}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Facebook Import Notice */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <svg
                className="w-5 h-5 text-blue-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span className="text-gray-600 text-xs">
                Comentários importados do Facebook
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-[#0B0B0F] py-8 mt-16">
        <div className="max-w-[1040px] mx-auto px-6 text-center">
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-4">
            <a href="#" className="text-[#98A2B3] text-sm hover:text-[#F2F4F7] transition-colors">
              Termos de Uso
            </a>
            <a href="#" className="text-[#98A2B3] text-sm hover:text-[#F2F4F7] transition-colors">
              Política de Privacidade
            </a>
            <a href="#" className="text-[#98A2B3] text-sm hover:text-[#F2F4F7] transition-colors">
              Suporte
            </a>
          </div>
          <p className="text-[#98A2B3] text-xs">
            © 2025 GLE — Todos os direitos reservados.
          </p>
        </div>
      </div>
    </div>
  );
}