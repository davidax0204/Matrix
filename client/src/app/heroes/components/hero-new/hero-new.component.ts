import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-hero-new',
  templateUrl: './hero-new.component.html',
  styleUrls: ['./hero-new.component.css'],
})
export class HeroNewComponent implements OnInit {
  heroCreateForm: FormGroup;
  name;
  suitColors;
  ability;

  colors: Array<any> = [
    { description: 'White', value: 'White', checked: false },
    { description: 'Black', value: 'Black', checked: false },
    { description: 'Blue', value: 'Blue', checked: false },
    { description: 'Green', value: 'Green', checked: false },
    { description: 'Yellow', value: 'Yellow', checked: false },
    { description: 'Red', value: 'Red', checked: false },
  ];

  isColorsCheckBoxesTouched;

  constructor(
    private formBuilder: FormBuilder,
    private heroesService: HeroesService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.formInit();
  }

  formInit() {
    this.heroCreateForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      suitColors: this.formBuilder.array([], [Validators.required]),
      ability: ['attacker', Validators.required],
    });

    this.name = this.heroCreateForm.get('name');
    this.ability = this.heroCreateForm.get('ability');
  }

  onCheckChange(event) {
    const formArray: FormArray = this.heroCreateForm.get(
      'suitColors'
    ) as FormArray;

    if (event.target.checked) {
      this.checkBoxValueChange(event.target.value);
      formArray.push(new FormControl(event.target.value));
    } else {
      this.checkBoxValueChange(event.target.value);
      let i: number = 0;

      formArray.controls.forEach((ctrl: FormControl) => {
        if (ctrl.value == event.target.value) {
          formArray.removeAt(i);
          return;
        }
        i++;
      });
    }
    this.isColorsCheckBoxesTouched = true;
  }

  checkBoxValueChange(colorSearch: string) {
    var colorObjIndex = this.colors.findIndex(
      (color) => color.value == colorSearch
    );
    this.colors[colorObjIndex].checked = !this.colors[colorObjIndex].checked;
  }

  invalidNameMessage() {
    if (this.name.errors?.required) {
      return "You must enter a hero's name";
    }
  }

  invalidSuitColorsMessage() {
    if (this.heroCreateForm.controls['suitColors'].errors?.required)
      return "You must choose the hero's suit colors";
  }

  invalidAbilityMessage() {
    if (this.ability.errors?.required) {
      return 'You must choose a ability';
    }
  }

  getFormValues() {
    return {
      name: this.name.value,
      ability: this.ability.value,
      suitColors: this.getSelectedColors().join(', '),
    };
  }

  getSelectedColors() {
    let array = [];
    this.colors.forEach((color) => {
      if (color.checked == true) {
        array.push(color.value);
      }
    });
    return array;
  }

  formReset() {
    this.heroCreateForm.reset({ ability: 'attacker' });

    this.colors.forEach((el) => {
      el.checked = false;
    });

    const formArray: FormArray = this.heroCreateForm.get(
      'suitColors'
    ) as FormArray;

    while (formArray.length !== 0) {
      formArray.removeAt(0);
    }

    this.isColorsCheckBoxesTouched = false;
  }

  createHero() {
    this.heroesService.createHero(this.getFormValues()).subscribe(() => {
      this.toastr.success(`${this.name.value} was succesfully created`);
      this.formReset();
    });
  }
}
