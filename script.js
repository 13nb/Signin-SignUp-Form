const container = document.querySelector('.container'),
      signupBtn = document.querySelector('.signup-btn'),
      signinBtn = document.querySelector('.signin-btn'),
      headingSpan2 = document.querySelector('.heading-span-2'),
      userName = document.getElementById('username'),
      email = document.getElementById('email'),
      password = document.getElementById('password'),
      password2 = document.getElementById('password2'),
      form = document.querySelector('form'),
      formInputWrapper = document.querySelectorAll('.form-input-wrapper');

const clearForm = () => {
    formInputWrapper.forEach((item) => {
        item.className = 'form-input-wrapper'
    });
    form.reset();
};

signupBtn.addEventListener('click', () => {
    container.classList.add('change');
    setTimeout(() => {
        headingSpan2.textContent = 'Up';
    },200);
    form.className = 'form sign-up';
    clearForm();
});

signinBtn.addEventListener('click', () => {
    container.classList.remove('change');
    setTimeout(() => {
        headingSpan2.textContent = 'In';
    },200);
    form.className = 'form sign-in';
    clearForm();
});

const error = (input, message) => {
    const inputWrapper = input.parentElement;
    inputWrapper.className = 'form-input-wrapper error';
    inputWrapper.querySelector('.message').textContent = message;
};

const success = (input) => {
    const inputWrapper = input.parentElement;
    inputWrapper.className = 'form-input-wrapper success';
};

const checkRequireFields = (inputArr) => {
    inputArr.forEach((input) => {
        if (input.value.trim() === '') {
            if (input.id === 'password2') {
                error(input, 'Password confirmation is required')
            } else {
                error(input, `${input.id} is required`);
            };
        } else {
            success(input);
        }
    });
};

const checkEmail = (input) => {
    const regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (regEx.test(input.value.trim())) {
        success(input);
    } else {
        error(input, 'email is not valid');
    };
};

const checkLength = (input, min, max) => {
    if (input.value.length < min) {
        error(input, `${input.id} must be at least ${min} characters`)
    } else if(input.value.length > max) {
        error(input, `${input.id} must be at less than ${max}} characters`)
    } else {
        success(input);
    }
};

const passwordMatch = (input1, input2) => {
    if (input1.value !== input2.value) {
        error('Passwords don`t match');
    };
};

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (form.classList[1] === 'sign-up') {
        checkRequireFields([username, email, password, password2]);
        checkLength(username, 2, 15);
        checkLength(password, 5, 25);
        passwordMatch(password, password2);
    } else {
        checkRequireFields([email, password]);
    };
    checkEmail(email);
});