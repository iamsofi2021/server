import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() message = '';
  @Input() timeOut = false;
  @Input() isConfirmModal = false;
  @Input() isErrorMsg = false;

  show = false;

  constructor(
    public activeModal: NgbActiveModal,
  ) {
  }

  ngOnInit(): void {
    this.show = true;
    if (this.timeOut) {
      setTimeout(() => {
        this.activeModal.close(false);
      }, 3000);
    }
  }

  accept(): void {
    this.activeModal.close(true);
  }

  cancel(): void {
    this.activeModal.close(false);
  }
}
