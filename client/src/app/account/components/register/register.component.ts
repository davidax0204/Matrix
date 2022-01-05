import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../../account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../style/account.css'],
})
export class RegisterComponent implements OnInit {
  signUpForm: FormGroup;
  userName;
  email;
  password;
  passwordRepeated;

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private toaster: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formInit();
  }

  formInit() {
    this.signUpForm = this.formBuilder.group(
      {
        userName: ['', [Validators.required, this.userNameValidator]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, this.passwordValidator]],
        passwordRepeated: ['', Validators.required],
      },
      {
        validators: this.passwordRepeatedValidator,
      }
    );

    this.userName = this.signUpForm.get('userName');
    this.email = this.signUpForm.get('email');
    this.password = this.signUpForm.get('password');
    this.passwordRepeated = this.signUpForm.get('passwordRepeated');
  }

  invalidNameMessage() {
    if (this.userName.errors?.required) {
      return 'You must enter an user name';
    }
    if (this.userName.errors?.userNameLettersError) {
      return 'User name must contain letters only';
    }
  }

  invalidEmailMessage() {
    if (this.email.errors?.required) {
      return 'You must enter an Email';
    }
    if (this.email.errors?.email) {
      return 'You must enter a valid Email';
    }
  }

  invalidPasswordMessage() {
    if (this.password.errors?.required) {
      return 'You must enter a password';
    }
    if (this.password.errors?.passwordinvalid) {
      return 'A password must be at least 8 chars and contain digits special numbers and no spaces';
    }
  }

  invalidPsswordRepeatedMessage() {
    if (this.passwordRepeated.errors?.required) {
      return 'You must repeat on the password';
    }

    if (this.signUpForm.errors?.passwordnotrepeated) {
      return 'Two passwords must be identical.';
    }
  }

  passwordRepeatedValidator(control: FormGroup): ValidationErrors | null {
    const password = control.get('password').value;
    const passwordRepeated = control.get('passwordRepeated').value;
    return password !== passwordRepeated ? { passwordnotrepeated: true } : null;
  }

  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const isIncludesWhiteSpace = control.value.includes(' ');
    const isIncludesDigits =
      /^(?=.*\d)(?=.*[a-z])(?=.*\W)(?=.*[A-Z]).{8,}$/.test(control.value);
    const invalid = !isIncludesDigits || isIncludesWhiteSpace;
    return invalid ? { passwordinvalid: true } : null;
  }

  userNameValidator(control: AbstractControl): ValidationErrors | null {
    return !/^[a-zA-Z\s]*$/.test(control.value)
      ? { userNameLettersError: true }
      : null;
  }

  onSubmitSignUpForm() {
    this.accountService.register(this.signUpForm.value).subscribe(() => {
      this.toaster.success(
        `${this.userName.value} was successfully registered`
      );
    });
  }
}
