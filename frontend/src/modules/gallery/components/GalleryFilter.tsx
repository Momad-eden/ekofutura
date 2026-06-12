interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function GalleryFilter({
  value,
  onChange,
}: Props) {
  return (
    <div className="mb-8">

      <select
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="
          p-3
          rounded-xl
          border
          border-custom
          bg-card
        "
      >
        <option value="ALL">
          Tous les contenus
        </option>

        <option value="IMAGE">
          Photos
        </option>

        <option value="VIDEO">
          Vidéos
        </option>

        <option value="YOUTUBE">
          YouTube
        </option>

      </select>

    </div>
  );
}