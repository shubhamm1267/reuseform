import { Component } from '@angular/core';
import {  FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FormpreviewComponent } from './formpreview/formpreview.component';
import { Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { A11yModule } from '@angular/cdk/a11y';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkStepperModule } from '@angular/cdk/stepper';
// import {CdkTableModule} from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
// import {MatTableModule} from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { OverlayModule } from '@angular/cdk/overlay';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormBuilder, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface FieldConfig {
  type: string;
  label: string;
  name: string;
  options?: any[];
  validations?: any[];
}

@Component({
  selector: 'app-root',
  imports: [
    FormsModule,
    A11yModule,
    ClipboardModule,
    CommonModule,
    CdkStepperModule,
    // CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    // MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    OverlayModule,
    PortalModule,
    ScrollingModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  fieldTypes = ['Text', 'Email', 'Number', 'Password', 'Dropdown', 'Checkbox', 'Radio'];
  formFields: FieldConfig[] = [];
  selectedFieldType: string = '';
  newFieldLabel: string = '';
  newFieldName: string = '';
  newOptions: string[] = [];
  generatedFormCode = '';
  componentName = 'DynamicFormComponent';
  formName = 'dynamicForm';

  constructor(private fb: FormBuilder, public dialog: MatDialog) { }

  addField() {
    if (!this.selectedFieldType || !this.newFieldLabel || !this.newFieldName) {
      alert('Please enter field details');
      return;
    }

    const newField: FieldConfig = {
      type: this.selectedFieldType,
      label: this.newFieldLabel,
      name: this.newFieldName,
      options: this.selectedFieldType === 'Dropdown' || this.selectedFieldType === 'Radio' || this.selectedFieldType === 'Checkbox' ? [...this.newOptions] : undefined,
      validations: [],
    };

    this.formFields.push(newField);

    // Reset fields
    this.selectedFieldType = '';
    this.newFieldLabel = '';
    this.newFieldName = '';
    this.newOptions = [];
  }


  copyToClipboard() {
    navigator.clipboard.writeText(this.generatedFormCode).then(() => {
      alert('Code copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy:', err);
    });
  }


  addOption(optionValue: string) {
    if (optionValue) {
      this.newOptions.push(optionValue);
    }
  }

  removeOption(index: number) {
    this.newOptions.splice(index, 1);
  }

  generateForm() {
    let formControls = '';
    let formHtml = '';

    this.formFields.forEach((field) => {
      formControls += `  ${field.name}: new FormControl('', [${field.validations?.join(', ')}]),\n`;

      if (['Text', 'Email', 'Number', 'Password'].includes(field.type)) {
        formHtml += `<mat-form-field><mat-label>${field.label}</mat-label>\n<input matInput type="${field.type.toLowerCase()}" formControlName="${field.name}"/>\n</mat-form-field>\n`;
      } else if (field.type === 'Dropdown') {
        formHtml += `<mat-form-field><mat-label>${field.label}</mat-label>\n<mat-select formControlName="${field.name}">\n`;
        field.options?.forEach((opt) => {
          formHtml += `<mat-option value="${opt}">${opt}</mat-option>\n`;
        });
        formHtml += `</mat-select></mat-form-field>\n`;
      } else if (field.type === 'Checkbox') {
        field.options?.forEach((opt) => {
          formHtml += `<mat-checkbox formControlName="${field.name}">${opt}</mat-checkbox>\n`;
        });
      } else if (field.type === 'Radio') {
        field.options?.forEach((opt) => {
          formHtml += `<mat-radio-group formControlName="${field.name}"><mat-radio-button value="${opt}">${opt}</mat-radio-button></mat-radio-group>\n`;
        });
      }
    });

    this.generatedFormCode = `
  import { Component } from '@angular/core';
  import { FormGroup, FormControl, Validators } from '@angular/forms';

  @Component({
    selector: 'app-${this.componentName.toLowerCase()}',
    templateUrl: './${this.componentName.toLowerCase()}.component.html',
    styleUrls: ['./${this.componentName.toLowerCase()}.component.css'],
  })
  export class ${this.componentName} {
    ${this.formName} = new FormGroup({
${formControls}    });

    onSubmit() {
      console.log(this.${this.formName}.value);
    }
  }
  
  // HTML Code:
  <form [formGroup]="${this.formName}" (ngSubmit)="onSubmit()">
${formHtml}
    <button mat-raised-button color="primary" type="submit">Submit</button>
  </form>
    `;
  }

  previewForm() {
    this.dialog.open(FormpreviewComponent, {
      width: '50%',
      data: { fields: this.formFields }
    });
  }
}
