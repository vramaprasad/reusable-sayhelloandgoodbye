/** Represents the input configuration for the semantic-version action */
export class ActionConfig {
    /** Set to specify a specific branch, default is the current HEAD */
    public branch: string = "HEAD";
    /** The prefix to use to identify tags */
    public tagPrefix: string = "v";
    /** Use branches instead of tags */
    public useBranches: boolean = false;
    /** A string which, if present in a git commit, indicates that a change represents a major (breaking) change. Wrap with '/' to match using a regular expression. */
    public majorPattern: string = "(MAJOR)";
    /** A string which, if present in a git commit, indicates that a change represents a minor (feature) change. Wrap with '/' to match using a regular expression. */
    public minorPattern: string = "(MINOR)";
    /** Pattern to use when formatting output version */
    public versionFormat: string = '${major}.${minor}.${patch}';
    /** Path to check for changes. If any changes are detected in the path the 'changed' output will true. Enter multiple paths separated by spaces. */
    public changePath: string = '';
    /** Use to create a named sub-version. This value will be appended to tags created for this version. */
    public namespace: string = "";
    /** If true, every commit will be treated as a bump to the version. */
    public bumpEachCommit: boolean = false;
    /** If true, the body of commits will also be searched for major/minor patterns to determine the version type */
    public searchCommitBody: boolean = false;
    /** The output method used to generate list of users, 'csv' or 'json'. Default is 'csv'. */
    public userFormatType: string = "csv";
}