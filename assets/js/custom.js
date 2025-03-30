// Toggle between login and register forms
function showRegister() {
    $("#login-card").hide();
    $("#register-card").show();
  }
  
  function showLogin() {
    $("#register-card").hide();
    $("#login-card").show();
  }
  
  // Password toggle functionality
  function setupPasswordToggle(inputId, toggleId) {
    const $toggle = $("#" + toggleId);
    const $input = $("#" + inputId);
    
    $toggle.on("click", function() {
      if ($input.attr("type") === "password") {
        $input.attr("type", "text");
        $toggle.removeClass("fa-eye").addClass("fa-eye-slash");
      } else {
        $input.attr("type", "password");
        $toggle.removeClass("fa-eye-slash").addClass("fa-eye");
      }
    });
  }
  
  $(document).ready(function() {
    // Setup password toggles
    setupPasswordToggle("login-password", "toggle-login-password");
    setupPasswordToggle("register-password", "toggle-register-password");
  
    const $sidebar = $("#sidebar");
    const $sidebarOverlay = $("#sidebarOverlay");
    const $toggleSidebar = $("#toggleSidebar");
    const $themeToggle = $("#themeToggle");
    const $themeIcon = $("#themeIcon");
    const $body = $("body");
  
    // Toggle sidebar function
    function toggleSidebarFn() {
      if ($(window).width() < 992) {
        // Mobile behavior
        $sidebar.toggleClass("show");
        $sidebarOverlay.toggleClass("show");
      } else {
        // Desktop behavior
        $sidebar.toggleClass("collapsed");
      }
    }
  
    // Toggle sidebar on button click
    $toggleSidebar.on("click", toggleSidebarFn);
  
    // Close sidebar when clicking on overlay
    $sidebarOverlay.on("click", function() {
      $sidebar.removeClass("show");
      $sidebarOverlay.removeClass("show");
    });
  
    // Close sidebar when clicking on a nav link (for mobile)
    $(".sidebar .nav-link").on("click", function(e) {
      if ($(window).width() < 992 && !$(this).attr("data-bs-toggle")) {
        $sidebar.removeClass("show");
        $sidebarOverlay.removeClass("show");
      }
    });
  
    // Dark/Light mode toggle
    $themeToggle.on("click", function() {
      $body.toggleClass("dark-mode");
      if ($body.hasClass("dark-mode")) {
        $themeIcon.removeClass("fa-moon").addClass("fa-sun");
        localStorage.setItem("darkMode", "enabled");
      } else {
        $themeIcon.removeClass("fa-sun").addClass("fa-moon");
        localStorage.removeItem("darkMode");
      }
    });
  
    // Check for saved preference
    if (localStorage.getItem("darkMode") === "enabled") {
      $body.addClass("dark-mode");
      $themeIcon.removeClass("fa-moon").addClass("fa-sun");
    }
  
    // Initialize charts
    const barCtx = document.getElementById("barChart").getContext("2d");
    new Chart(barCtx, {
      type: "bar",
      data: {
        labels: ["Total Users", "Active Users", "Inactive Users"],
        datasets: [{
          label: "Users Count",
          data: [100, 80, 20],
          backgroundColor: ["#6366f1", "#4f46e5", "#8b5cf6"]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "#0f172a",
            titleColor: "#ffffff",
            bodyColor: "#e2e8f0",
            borderColor: "#334155",
            borderWidth: 1
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: "rgba(203, 213, 225, 0.1)"
            }
          },
          x: {
            grid: {
              color: "rgba(203, 213, 225, 0.1)"
            }
          }
        }
      }
    });
  
    const pieCtx = document.getElementById("pieChart").getContext("2d");
    new Chart(pieCtx, {
      type: "pie",
      data: {
        labels: ["Total Users", "Active Users", "Inactive Users"],
        datasets: [{
          data: [100, 80, 20],
          backgroundColor: ["#6366f1", "#4f46e5", "#8b5cf6"]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              color: "#0f172a",
              font: {
                size: 12
              }
            }
          },
          tooltip: {
            backgroundColor: "#0f172a",
            titleColor: "#ffffff",
            bodyColor: "#e2e8f0",
            borderColor: "#334155",
            borderWidth: 1
          }
        }
      }
    });
  
    // Handle window resize
    $(window).on("resize", function() {
      if ($(window).width() >= 992) {
        $sidebar.removeClass("show");
        $sidebarOverlay.removeClass("show");
      }
    });
  });