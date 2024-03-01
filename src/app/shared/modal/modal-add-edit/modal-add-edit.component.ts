import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalType } from 'src/app/types';
import { MIN_INPUT_LEN, RUS_PHONE_REGEXP } from 'src/constants';

@Component({
  selector: 'app-table-modal-add-edit',
  templateUrl: './modal-add-edit.component.html',
  styleUrls: ['./modal-add-edit.component.css']
})
export class ModalAddEditComponent {
  @Input() type: ModalType = ModalType.NONE;
  @Input() close!: () => void;

  public modalTypes = ModalType;

  // TODO: 2) Удаление айтемов
  // TODO: 3) Создание новых айтемов
  // TODO: 4) Редактирование айтемов (+ при открытии модалки в форму сетятся данные с выбранного юзера)
  // TODO: 5) Сохранение данных в локалсторедж - чтоб при перезагрузке стр. оставались измененные из пунктов 2, 3 и 4 данные
  //          + в ридми поментку, как получить исх. данные (очистить локалсторедж)
  // TODO: 6) Добавь пометку в readme про SCSS (почему у тебя css и примеры твоего кода на SCSS)
  // TODO: 7) Адаптив до 375px

  public form = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(MIN_INPUT_LEN)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(MIN_INPUT_LEN)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.pattern(RUS_PHONE_REGEXP)]),
  });
}
