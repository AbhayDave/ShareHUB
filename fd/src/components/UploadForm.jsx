import CreateLinkForm from "./CreateLinkForm";
import SendFilesForm from "./SendFilesForm";

const MyForm = (props) => {
  return (
    <div className="flex items-center my-5 flex-col gap-8 justify-center">
      <h1 className="text-2xl">Transfer Files</h1>

      <div
        ref={props.reff}
        role="tablist"
        className="tabs w-2/6 border rounded-xl tabs-bordered tabs-md xl:tabs-lg"
      >
        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          className="tab"
          aria-label="Send Files"
        />
        <div role="tabpanel" className="tab-content p-10">
          <SendFilesForm />
        </div>

        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          className="tab"
          aria-label="Create Link"
          checked
        />
        <div role="tabpanel" className="tab-content p-10">
          <CreateLinkForm />
        </div>
      </div>
    </div>
  );
};

export default MyForm;
