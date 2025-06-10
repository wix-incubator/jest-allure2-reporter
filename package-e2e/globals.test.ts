import "jest-allure2-reporter/globals";

// Pseudo-annotations
assertEqualType($Description, global.$Description);
assertEqualType($DescriptionHtml, global.$DescriptionHtml);
assertEqualType($Epic, global.$Epic);
assertEqualType($Feature, global.$Feature);
assertEqualType($Story, global.$Story);
assertEqualType($Issue, global.$Issue);
assertEqualType($Link, global.$Link);
assertEqualType($Owner, global.$Owner);
assertEqualType($Severity, global.$Severity);
assertEqualType($Tag, global.$Tag);
assertEqualType($TmsLink, global.$TmsLink);

// Runtime API
assertEqualType(allure, global.allure);

// Decorators
assertEqualType(Attachment, global.Attachment);
assertEqualType(FileAttachment, global.FileAttachment);
assertEqualType(Step, global.Step);

function assertEqualType<T>(_a: T, _b: T): void {
  // no-op
}
