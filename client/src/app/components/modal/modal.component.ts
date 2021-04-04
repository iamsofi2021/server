import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() message = '';
  @Input() isConfirmModal = false;

  show = false;

  constructor(
    public activeModal: NgbActiveModal,
  ) {
  }

  ngOnInit(): void {
    this.show = true;
  }

  accept(): void {
    this.activeModal.close(true);
  }

  cancel(): void {
    this.activeModal.close(false);
  }
}
