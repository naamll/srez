document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("make_request");
  const closeModalButton = modal.querySelector(".close");

  // Функция для открытия модального окна
  const openModal = () => {
    modal.showModal();
  };

  // Закрытие модального окна
  closeModalButton.addEventListener("click", () => {
    modal.close();
  });

  // Открытие модального окна по кнопке "Записаться"
  document
    .getElementById("openRequestModalBtn")
    .addEventListener("click", openModal);
  document
    .getElementById("openRequestModalBtnCard")
    .addEventListener("click", openModal);

  // Проверка видимости блока и открытие модального окна при прокрутке
  const servicesSection = document.querySelector("#services");

  const checkVisibility = () => {
    const rect = servicesSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Проверка, пересекает ли элемент видимую область
    if (rect.top < windowHeight && rect.bottom >= 0) {
      openModal();
      // Удаляем обработчик, чтобы модальное окно открывалось только один раз
      window.removeEventListener("scroll", checkVisibility);
    }
  };

  // Добавляем обработчик события прокрутки
  window.addEventListener("scroll", checkVisibility);

  // Аккордионы
  const accordionTriggers = document.querySelectorAll(".accordion__trigger");
  accordionTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const content = trigger.nextElementSibling;
      content.classList.toggle("active"); // переключение класса активного
      if (content.classList.contains("active")) {
        content.style.maxHeight = content.scrollHeight + "px"; // устанавливаем высоту
      } else {
        content.style.maxHeight = "0"; // сбрасываем высоту
      }
    });
  });

  // Обработка формы
  const form = modal.querySelector(".make_request_form");
  form.addEventListener("submit", async (event) => {
    event.preventDefault(); // предотвращаем обновление страницы
    const email = form.email.value;

    // Валидация email
    if (validateEmail(email)) {
      try {
        // Замените 'YOUR_API_URL' на правильный адрес
        const response = await fetch("https://dummyjson.com/products/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });

        if (!response.ok) throw new Error("Ошибка запроса");

        alert("Запрос успешно отправлен!");
        modal.close(); // Закрыть модал после успешного запроса
        form.reset(); // Сбросить форму
      } catch (error) {
        alert("Произошла ошибка. Попробуйте еще раз.");
      }
    } else {
      alert("Пожалуйста, введите корректный email.");
    }
  });

  // Валидация email
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  // Вложенные ссылки в шапке
  const expandLinks = document.querySelectorAll(".link_expand");
  expandLinks.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      const linkContent = link.querySelector(".link_expand__content");
      linkContent.style.display = "block";
    });
    link.addEventListener("mouseleave", () => {
      const linkContent = link.querySelector(".link_expand__content");
      linkContent.style.display = "none";
    });
  });
});
