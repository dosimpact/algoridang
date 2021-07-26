import { CoreOutput } from 'src/common/dtos/output.dto';
import { UploadedObject } from '../entities/uploaded-object.entity';

export class GetUploadedObjectsInput {}
export class GetUploadedObjectsOutput extends CoreOutput {
  uploadedObjects?: UploadedObject[];
}
