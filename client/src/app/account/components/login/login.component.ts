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
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../style/account.css'],
})
export class LoginComponent implements OnInit {
  signInForm: FormGroup;
  email;
  password;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private accountService: AccountService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.formInit();
  }

  formInit() {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.passwordValidator]],
    });

    this.email = this.signInForm.get('email');
    this.password = this.signInForm.get('password');
  }

  invalidEmailMessage() {
    if (this.email.errors?.required) {
      return 'You must enter an Email';
    }
    if (this.email.errors?.email) {
      return 'You must enter a valid Email';
    }
  }

  invalidPassword() {
    if (this.password.errors?.required) {
      return 'You must enter a password';
    }
    if (this.password.errors?.passwordinvalid) {
      return 'A password must be at least 8 chars and contain digits special numbers and no spaces';
    }
  }

  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const isIncludesWhiteSpace: boolean = control.value.includes(' ');
    const isIncludesDigits: boolean =
      /^(?=.*\d)(?=.*[a-z])(?=.*\W)(?=.*[A-Z]).{8,}$/.test(control.value);
    const invalid = !isIncludesDigits || isIncludesWhiteSpace;
    return invalid ? { passwordinvalid: true } : null;
  }

  onSubmitSignInForm() {
    this.accountService.login(this.signInForm.value).subscribe(() => {
      this.router.navigateByUrl('/heroes/my');
      this.toastr.success('You were successfully logged in');
    });
  }
}
